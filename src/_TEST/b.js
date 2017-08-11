// @flow

import Record from './associations';

import type {
  OneToOne,
  OneToMany,
  ConciseOneToOne,
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

var oneToOneA: OneToOne<*, *, *, *> = {
  local: ClassA,
  localKey: 'b',
  foreign: ClassB,
  foreignKey: 'a',
};
var conciseOneToOneA: ConciseOneToOne<*, *, *, *> = {
  from: [ClassA, 'b'],
  to: [ClassB, 'a'],
};
