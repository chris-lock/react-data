// @flow

import Record from './Record';
import OneToManyA from './_OneToManyA';

import type {
  Record$Collection
} from './Record';

export type OneToManyB$Collection = Record$Collection<OneToManyB>;

type OneToManyB$Schema = {
  a: OneToManyA,
};

export default class OneToManyB
extends Record<OneToManyB$Schema> {
  _data: OneToManyB$Schema;
}
