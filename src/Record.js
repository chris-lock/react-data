// @flow

import Collection from './Collection';

import type {
  WriteKey,
} from './Writer';

export type Schema = {
  foo: boolean,
};

export default class Record<Record$Schema: Schema> {
  static collection: Collection<Record$Schema> = new Collection(this);
  static all = this.collection.all;
  static find = this.collection.find;
  static where = this.collection.where;
  static add = this.collection.add;
  static remove = this.collection.remove;

  _data: Record$Schema;

  constructor(key: WriteKey, data: Record$Schema) {
    this._data = data;
  }

  data(key: WriteKey): Schema {
    return this._data;
  }
}

type FooSchema = (Schema & {
  foo: boolean,
});

class Foo extends Record<FooSchema> {}

Foo.where((schema: FooSchema) => {
  return !schema;
});

Foo.where({
  foo: true,
});
