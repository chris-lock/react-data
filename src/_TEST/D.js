// @flow

import Record from './Record';

import type A from './A';
import type C from './C';

type DSchema = {
  a: A,
  c: C,
};

export default class D
extends Record<DSchema> {
  _data: DSchema;
}
