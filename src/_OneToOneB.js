// @flow

import Record from './Record';

import type OneToOneA from './_OneToOneA';

type OneToOneB$Schema = {
  a: OneToOneA,
};

export default class OneToOneB
extends Record<OneToOneB$Schema> {
  _data: OneToOneB$Schema;
}
