// @flow

import Updatable from 'Updatable';
import Associations from 'Associations';

export type RecordData = {};

export default class Record<Data: RecordData>
extends Updatable {
  _data: Data;

  constructor(data: Data) {
    super();

    this._data = data;
  }
}

type DataFoo = {
  c: boolean,
};

class Foo
extends Record<DataFoo> {
  _data: DataFoo;

  get b(): boolean {
    return this._data.c;
  }
}

type DataBar = {
  a: Foo,
};

class Bar
extends Record<DataBar> {
  _data: DataBar;

  get a(): Foo {
    return Associations.belongsTo(this, 'c', Foo);
  }
}
