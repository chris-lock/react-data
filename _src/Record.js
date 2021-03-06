// @flow

import Association from './Association';
import Collection from './Collection';
import VersionManager from './VersionManager';

import type {
  Collection$Query,
} from './Collection';
import type {
  WriteKey,
} from './Writer';

export type Record$Child<Schema> = $Subtype<Record<Schema>>;

export type Record$Class<Schema> = Class<Record$Child<Schema>>;

export type Record$Schema = {};

export default class Record<Schema: Record$Schema> {
  static association: Association<Schema> = new Association;
  static _collection: Collection<Schema>;

  static get collection(): Collection<Schema> {
    return this._collection || this.setCollection();
  }

  static setCollection(): Collection<Schema> {
    return (this._collection = new Collection((this: Record$Class<Schema>)));
  }

  static asCollection(): Record$Class<Schema> {
    this.setCollection();

    return this;
  }

  static first(query: Collection$Query<Schema>): void {
    return this.collection.first(query);
  }

  static where(query: Collection$Query<Schema>): Collection<Schema> {
    return this.collection.where(query);
  }

  static add(key: WriteKey, schema: Schema): void {
    this.collection.add(key, schema);
  }

  static remove(key: WriteKey, query: Collection$Query<Schema>): void {
    this.collection.remove(key, query);
  }

  _collection: ?Collection<Schema>;
  _data: Schema;
  _versionManager: VersionManager = new VersionManager;

  constructor(key: WriteKey, data: Schema) {
    this._data = data;
  }

  data(key: WriteKey): Schema {
    return this._data;
  }

  dataItem<Key: $Keys<Schema>>(key: Key): ?$ElementType<Schema, Key> {
    return this._data[key];
  }

  update(key: WriteKey, newData: $Shape<Schema>): void {}

  versionManager(key: WriteKey): VersionManager {
    return this._versionManager;
  }

  asCollection(key: WriteKey, collection: Collection<Schema>): Record$Child<Schema> {
    this._collection = collection;
    this._collection.onFirstRecordChange(key, this._onRecordAsCollectionChange);

    return this;
  }

  _onRecordAsCollectionChange(data: Schema): void {
    this._data = data;
    this._versionManager.clear();
  }

  updateQueryParams<
    Props: {},
    State: {}
  >(props: ?Props, state: ?State): void {
    if (this._collection) {
      this._collection.updateQueryParams(props, state);
    }
  }

  version(): number {
    return this._versionManager.version();
  }

  dispose(): void {
    if (this._collection) {
      this._collection.dispose();
    }
  }
}
