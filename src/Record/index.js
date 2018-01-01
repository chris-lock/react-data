// @flow

import Table from './Table';
import Collection from './Collection';
import Helpers from 'utilities/Helpers';
import Cache from 'utilities/Cache';

import type {
  WriteKey,
} from 'Writer';
import type {
  Record$Query,
} from './Query';

export type Record$Child<Schema> = $Subtype<Record<Schema>>;
export type Record$Class<Schema> = Class<Record$Child<Schema>>;
export type Record$Schema = {};

export default class Record<Schema: Record$Schema> {
  static _table: Table<Schema>;

  static table(): Table<Schema> {
    return this._table || this._getTable();
  }

  static _getTable(): Table<Schema> {
    return this._table = new Table((this: Record$Class<Schema>));
  }

  static asCollection(): Record$Class<Schema> {
    this._getTable();

    return this;
  }

  static first(query: Record$Query<Schema>): Record$Child<Schema> {
    return new Collection(this.table()).first(query);
  }

  static where(query: Record$Query<Schema>): Collection<Schema> {
    return new Collection(this.table()).where(query);
  }

  static create(
    key: WriteKey,
    ...schemas: Array<Schema>
  ): Array<Record$Child<Schema>> {
    return this.table().create(key, ...schemas);
  }

  static asProxy(
    key: WriteKey,
    collection: Collection<Schema>
  ): Record$Child<Schema> {
    return new this(key, ({}: any)).proxy(key, collection);
  }

  _collection: ?Collection<Schema>;
  _data: Schema;
  _proxyRecord: ?Record$Child<Schema>;

  constructor(key: WriteKey, data: Schema) {
    this._data = data;
  }

  data(key: WriteKey): Schema {
    return (this._proxyRecord)
      ? this._proxyRecord.data(key)
      : this._data;
  }

  update(key: WriteKey, data: $Shape<Schema>): void {
    if (this._update(key, data)) {
      this.constructor.table.onUpdate(key, this._record());
    }
  }

  _update(key: WriteKey, data: $Shape<Schema>): boolean {
    return Helpers.objects.update(this.data(key), data);
  }

  _record(): Record$Child<Schema> {
    return this._proxyRecord || this;
  }

  destroy(key: WriteKey): void {
    this.constructor.table.onDestory(key, this._record());
  }

  proxy(key: WriteKey, collection: Collection<Schema>): Record$Child<Schema> {
    this._collection = collection;

    collection.cache().listeners.add(
      this._updateProxyRecord.bind(this, key, collection)
    );

    this._updateProxyRecord(key, collection, false);

    return this;
  }

  _updateProxyRecord(
    key: WriteKey,
    collection: Collection<Schema>,
    shouldCallOnUpdate: boolean = true
  ): void {
    this._proxyRecord = collection.firstRecord();

    if (shouldCallOnUpdate) {
      this.update(key, this.data(key));
    } else {
      this._update(key, this.data(key));
    }
  }

  cache(): Cache {
    // Should only clear if something changed so should have it's own cache
    // which means it doesn't need a reference to collection
    return (this._collection)
      ? this._collection.cache()
      : new Cache;
  }

  exists(): boolean {
    return !this._collection || !!this._proxyRecord;
  }

  dataItem<Key: $Keys<Schema>>(key: Key): ?$ElementType<Schema, Key> {
    return this._data[key];
  }
}
