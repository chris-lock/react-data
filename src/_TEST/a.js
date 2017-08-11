// @flow

import Record from './associations';

import type {
  OneToOne,
  OneToMany,
} from './associations';

type ClassAData = {
  b: ClassB,
  c: ClassC,
};

class ClassA
extends Record<ClassAData> {
  _data: ClassAData;
}

type ClassBData = {
  a: ClassA,
};

class ClassB
extends Record<ClassBData> {
  _data: ClassBData;
}

type ClassCData = {
  a: Array<ClassA>,
};

class ClassC
extends Record<ClassCData> {
  _data: ClassCData;
}

var oneToOneB: OneToOne<*, *, *, *> = {
  local: ClassB,
  localKey: 'a',
  foreign: ClassA,
  foreignKey: 'b',
};
var oneToMany: OneToMany<*, *, *, *> = {
  local: ClassC,
  localKey: 'a',
  foreign: ClassA,
  foreignKey: 'c',
};
