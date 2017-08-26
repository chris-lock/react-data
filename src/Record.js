// @flow

import Collection from './Collection';

import type {
  WriteKey,
} from './Writer';

export type Schema = {
  foo: boolean,
};

export default class Record<RecordSchema: Schema> {
  static collection: Collection<$Subtype<Schema>, $Subtype<Record<*>>> = new Collection(this);
  static all = this.collection.all;
  static find = this.collection.find;
  static where = this.collection.where;
  static add = this.collection.add;
  static remove = this.collection.remove;

  _data: RecordSchema;

  constructor(key: WriteKey, data: RecordSchema) {
    this._data = data;
  }

  data(key: WriteKey): Schema {
    return this._data;
  }
}

Record.where({
  foo: true,
})
