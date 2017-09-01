// @flow

import Collection from './Collection';

import type {
  WriteKey,
} from './Writer';

export type Schema = {
  foo: boolean,
};

export default class Record<Record$Schema: Schema> {
  static collection: Collection<Record$Schema, *, *> =
    new Collection((this: Class<$Subtype<Record<*>>>));
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
type Props = {
  bar: string,
};
type State = {
  baz: string,
};

class Foo extends Record<FooSchema> {}

var foo: Collection<any, Props, State> = Foo.where((schema: FooSchema, props: {}, state: {}) => {
      return !schema.foo;
    });

Foo.where({
  foo: true,
});
