// @flow

import Record from './associations';

import type {
  ManyToMany,
} from './associations';

type ClassASchema = {
  b: Array<ClassB>,
};

class ClassA
extends Record<ClassASchema> {
  _data: ClassASchema;
}

type ClassBSchema = {
  a: Array<ClassA>,
};

class ClassB
extends Record<ClassBSchema> {
  _data: ClassBSchema;
}

var manyToMany: ManyToMany<*, *, *, *> = {
  from: [ClassA, 'b'],
  to: [ClassB, 'a'],
};
