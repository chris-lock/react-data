// @flow

import Record from './Record';
import OneToOneA from './_OneToOneA';

import type {
  Record$Collection
} from './Record';

export type OneToOneB$Collection = Record$Collection<OneToOneB>;

type OneToOneB$Schema = {
  a: OneToOneA,
};

export default class OneToOneB
extends Record<OneToOneB$Schema> {
  _data: OneToOneB$Schema;
}
