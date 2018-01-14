// @flow

import Writer from 'Writer';
import Cache from 'utilities/Cache';
import Table from './Table';
import Query from './Query';
import ReadOnlyIterable from 'utilities/Iterable/ReadOnly';
import WriteOnlyIterable from 'utilities/Iterable/WriteOnly';

import type {
  WriteKey,
} from 'Writer';
import type {
  Record$Schema,
  Record$Child,
} from './index';
import type {
  Record$Query$Condition,
} from './Query';

export default class Collection<Schema: Record$Schema>
extends Writer {
  _cache: ?Cache;
  _key: WriteKey;
  _query: Query<Schema> = new Query;
  _readOnly: ReadOnlyIterable<Record$Child<Schema>>;
  _records: WriteOnlyIterable<Collection<Schema>, Record$Child<Schema>>;
  _table: Table<Schema>;

  constructor(table: Table<Schema>) {
    super();

    this._table = table;

    this._resetRecords();
    this._query.listeners.add(this._updateRecordsForCurrentQuery);
  }

  _resetRecords(): void {
    this._records = new WriteOnlyIterable(this);
    this._readOnly = new ReadOnlyIterable(this._records.all(this));
  }

  _updateRecordsForCurrentQuery(): void {
    this._resetRecords();

    this.onCreate(
      this._key,
      ...this._table.records.all(this._key)
    );
  }

  onCreate(key: WriteKey, ...records: Array<Record$Child<Schema>>): void {
    this._addIfAny(this._query.filter(key, records));
  }

  _addIfAny(newRecords: Array<Record$Child<Schema>>): void {
    if (newRecords.length) {
      this._records.add(...newRecords);
      this._breakCache();
    }
  }

  _breakCache(): void {
    if (this._cache) {
      this._cache.break();
    }
  }

  first(condition: Record$Query$Condition<Schema>): Record$Child<Schema> {
    return this._table.recordClass.asProxy(
      this._key,
      this.where(condition)
    );
  }

  where(condition: Record$Query$Condition<Schema>): Collection<Schema> {
    this._query.condition(condition);

    this._updateRecordsForCurrentQuery();

    return this;
  }

  onUpdate(key: WriteKey, ...records: Array<Record$Child<Schema>>): void {
    this._addIfAny(
      this._query.filter(key, this._contains(records, false))
    );
  }

  _contains(
    records: Array<Record$Child<Schema>>,
    selectIfExists: boolean,
  ): Array<Record$Child<Schema>> {
    const currentRecords: Array<Record$Child<Schema>> = this._records.all(this);

    return records.filter((record: Record$Child<Schema>): boolean =>
      (currentRecords.indexOf(record) >= 0) === selectIfExists
    );
  }

  onDestory(key: WriteKey, ...records: Array<Record$Child<Schema>>): void {
    const existing: Array<Record$Child<Schema>> = this._contains(records, true);

    if (existing) {
      this._records.remove(...existing);
      this._breakCache();
    }
  }

  destory(): void {
    this._table.collections.remove((this: any));
  }

  cache(): Cache {
    if (!this._cache) {
      this._table.collections.add((this: any));
      this._cache = new Cache;
    }

    return this._cache;
  }

  query(): Query<Schema> {
    return this._query;
  }

  forEach = this._readOnly.forEach;

  map = this._readOnly.map;

  find = this._readOnly.find;

  every = this._readOnly.every;

  some = this._readOnly.some;

  includes = this._readOnly.includes;

  slice = this._readOnly.slice;

  all = this._readOnly.all;
}
