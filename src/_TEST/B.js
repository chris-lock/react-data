// @flow

import Record from './Record';

import type A from './A';
import type C from './C';

type BSchema = {
  a: A,
  c: C,
};

export default class B
extends Record<BSchema> {
  _data: BSchema;
}
