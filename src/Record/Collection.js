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
  Record$Query,
} from './Query';

export default class Collection<Schema: Record$Schema>
extends Writer {
  _cache: ?Cache;
  _key: WriteKey;
  _queries: Array<Query<Schema>>;
  _readOnly: ReadOnlyIterable<Record$Child<Schema>>;
  _records: WriteOnlyIterable<Collection<Schema>, Record$Child<Schema>>
    = new WriteOnlyIterable(this);
  _table: Table<Schema>;

  constructor(
    table: Table<Schema>,
    queries: Array<Query<Schema>> = []
  ) {
    super();

    this._readOnly = new ReadOnlyIterable(this._records.all(this));
    this._queries = queries;
    this._table = table;
  }

  cache(): Cache {
    if (!this._cache) {
      this._table.collections.add((this: any));
      this._cache = new Cache;
    }

    return this._cache;
  }

  first(query: Record$Query<Schema>): Record$Child<Schema> {
    return this._table.recordClass.asProxy(
      this._key,
      this.where(query)
    );
  }

  where(query: Record$Query<Schema>): Collection<Schema> {
    this._queries.push(new Query(query));

    this.onCreate(
      this._key,
      ...this._table.records.all(this._key)
    );

    return this;
  }

  onCreate(key: WriteKey, ...records: Array<Record$Child<Schema>>): void {
    this._addIfAny(this._matchesQueries(key, records));
  }

  _matchesQueries(
    key: WriteKey,
    records: Array<Record$Child<Schema>>
  ): Array<Record$Child<Schema>> {
    return records.filter((record: Record$Child<Schema>): boolean =>
      this._queries.every((query: Query<Schema>): boolean =>
        query.matches(record.data(key))
      )
    );
  }

  _addIfAny(newRecords: Array<Record$Child<Schema>>): void {
    if (newRecords.length) {
      this._records.add(...newRecords);
      this._cacheClear();
    }
  }

  _cacheClear(): void {
    if (this._cache) {
      this._cache.break();
    }
  }

  onUpdate(key: WriteKey, ...records: Array<Record$Child<Schema>>): void {
    this._addIfAny(
      this._matchesQueries(key, this._contains(false, records))
    );
  }

  _contains(
    selectNotReject: boolean,
    records: Array<Record$Child<Schema>>
  ): Array<Record$Child<Schema>> {
    return records.filter((record: Record$Child<Schema>): boolean =>
      (this._records.all(this).indexOf(record) >= 0) === selectNotReject
    );
  }

  onDestory(key: WriteKey, ...records: Array<Record$Child<Schema>>): void {
    const existing: Array<Record$Child<Schema>> = this._contains(true, records);

    if (existing) {
      this._records.remove(...existing);
      this._cacheClear();
    }
  }

  destory(): void {
    this._table.collections.remove((this: any));
  }

  firstRecord(): ?Record$Child<Schema> {
    return this._records.all(this)[0];
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
