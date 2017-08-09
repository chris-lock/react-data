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

class Rec<Data: {}> {
  data: Data;

  belongsTo<
    Data: {},
    On: $Keys<Data>,
    Belongs: Rec<Data>
  >(belongs: Class<Belongs>, on: On): Belongs {
    return new belongs;
  }
}

type DataA = {
  c: B,
};

class A
extends Rec<DataA> {
  get b(): B {
    return this.data.c;
  }
}

type DataB = {
  a: A,
};

class B
extends Rec<DataB> {
  get a(): A {
    return this.belongsTo(A, 'b');
  }
}
