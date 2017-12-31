// @flow

import Table from './Table';
import Collection from './Collection';
import Helpers from 'utilities/Helpers';

import type {
  WriteKey,
} from './Writer';
import type {
  Record$Query,
} from './Collection';

export type Record$Child<Schema> = $Subtype<Record<Schema>>;
export type Record$Class<Schema> = Class<Record$Child<Schema>>;
export type Record$Schema = {};

export default class Record<Schema: Record$Schema> {
  static _table: Table<Schema>;

  static get table(): Table<Schema> {
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
    return new Collection(this.table).first(query);
  }

  static where(query: Record$Query<Schema>): Collection<Schema> {
    return new Collection(this.table).where(query);
  }

  static create(
    key: WriteKey,
    ...schemas: Array<Schema>
  ): Array<Record$Child<Schema>> {
    return this.table.create(key, ...schemas);
  }

  _data: Schema;

  data(key: WriteKey): Schema {
    return this._data;
  }

  update(key: WriteKey, data: $Shape<Schema>) {
    if (Helpers.objects.update(this._data, data)) {
      this.constructor.table.onUpdate(key, (this: Record$Child<Schema>));
    }
  }

  destroy(key: WriteKey) {
    this.constructor.table.onDestory(key, (this: Record$Child<Schema>));
  }
}
