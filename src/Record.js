// @flow

import Collection from './Collection';
import Data from './Data';

import type {
  Schema,
} from './Data';
import type {
  WriteKey,
} from './Writer';

export type {
  Schema,
};

export default class Record<Record$Schema: Schema> {
  static collection: Collection<Record$Schema> =
    new Collection((this: Class<$Subtype<Record<*>>>));
  static find = this.collection.find;
  static where = this.collection.where;
  static add = this.collection.add;
  static remove = this.collection.remove;

  _data: Data<Record$Schema>;

  constructor(key: WriteKey, data: Data<Record$Schema>) {
    this._data = data;
  }

  data<Key: $Keys<Record$Schema>>(key: Key): ?$ElementType<Record$Schema, Key> {
    return this._data.current[key];
  }

  update(key: WriteKey, newData: $Shape<Record$Schema>): void {
    this._data.update(newData);
  }
}
