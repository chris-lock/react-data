// @flow

import Updatable from 'Updatable';

export type RecordData = {};

export default class Record<Data: RecordData>
extends Updatable {
  _data: Data;

  constructor(data: Data) {
    super();

    this._data = data;
  }
}

// type Interface<method> = {
//   [_:method]: () => boolean,
// };
// type FooIsh = Interface<'test'>;

// class Foo {

// }

// const foo: FooIsh = new Foo;

// foo.test();

class Association {
  static belongsTo<
    B: Rec<*>,
    Key: $Keys<$PropertyType<B, 'data'>>,
  >(
    a: $ElementType<$PropertyType<B, 'data'>, Key>,
    key: Key,
    b: Class<B>
  ): B {
    return new b;
  }
}

class Rec<Data: {}> {
  data: Data;
}

type DataFoo = {
  c: boolean,
};

class Foo
extends Rec<DataFoo> {
  get b(): boolean {
    return this.data.c;
  }
}

type DataBar = {
  a: Foo,
};

class Bar
extends Rec<DataBar> {
  get a(): Foo {
    return Association.belongsTo(this, 'c', Foo);
  }
}
