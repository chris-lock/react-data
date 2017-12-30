// @flow

import Table from './Table';

import type {
  WriteKey,
} from './Writer';

export type Record$Child<Schema> = $Subtype<Record<Schema>>;
export type Record$Class<Schema> = Class<Record$Child<Schema>>;
export type Record$Schema = {};

export default class Record<Schema: Record$Schema> {
  static _table: Table<Schema>;

  static get table(): Table<Schema> {
    return this._table || this._getTable();
  }

  static _getTable(): Table<Schema> {
    return this._table = new Table(this);
  }

  static first(query: Collection$Query<Schema>): void {
    return new Collection(this.table).first(query);
  }

  static where(query: Collection$Query<Schema>): Collection<Schema> {
    return new Collection(this.table).where(query);
  }

  static create(key: WriteKey, ...schemas: Array<Schema>): void {
    this.table.create(key, ...schemas);
  }

  update(data) {
    if (updated) {
      this.constructor.table.onUpdate(this);
    }
  }
}

class Collection {
  onCreate(writeKey, record) {
    this._onChange(record, 'create')
  }

  onUpdate(writeKey, record) {
    this._onChange(record, 'update')
  }

  onDelete(writeKey, record) {
    this._onChange(record, 'delete')
  }

  _onChange(record, event) {
    matchesQuery !(event === 'delete' || !this.query.matches);
    inCollection = !(event === 'create' || !this.inCollection);

    if (matchesQuery && !inCollection) {
      this.records.push(record);
      this.cache.break();
      this.cache.add(record.cache);
    } else if (!matchesQuery && inCollection) {
      this.records.remove(record);
      this.cache.remove(record.cache);
      this.cache.break();
    }
  }
}
