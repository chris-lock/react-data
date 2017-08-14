// @flow

import Record from './associations';

import type {
  OneToOne,
} from './associations';

type ClassASchema = {
  b: ClassB,
};

class ClassA
extends Record<ClassASchema> {
  _data: ClassASchema;
}

type ClassBSchema = {
  a: ClassA,
};

class ClassB
extends Record<ClassBSchema> {
  _data: ClassBSchema;
}

var oneToOne: OneToOne<*, *, *, *> = {
  from: [ClassA, 'b'],
  to: [ClassB, 'a'],
};
