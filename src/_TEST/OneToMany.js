// @flow

import Record from './associations';

import type {
  OneToMany,
} from './associations';

type ClassASchema = {
  b: Array<ClassB>,
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

var oneToMany: OneToMany<*, *, *, *> = {
  from: [ClassA, 'b'],
  to: [ClassB, 'a'],
};
