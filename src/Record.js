// @flow

import Collection from './Collection';

import type {
  WriteKey,
} from './Writer';

export type Schema = {};

export default class Record<Record$Schema: Schema> {
  static collection: Collection<$Subtype<Record<*>>, *> =
    new Collection((this: Class<$Subtype<Record<*>>>));
  static find = this.collection.find;
  static where = this.collection.where;
  static add = this.collection.add;
  static remove = this.collection.remove;

  _data: Record$Schema;

  constructor(key: WriteKey, data: Record$Schema) {
    this._data = data;
  }

  data<Key: $Keys<Record$Schema>>(key: Key): ?$ElementType<Record$Schema, Key> {
    return this._data[key];
  }

  update(key: WriteKey, newData: $Shape<Record$Schema>): void {

  }
}
