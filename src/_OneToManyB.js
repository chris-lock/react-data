// @flow

import Record from './Record';

import type OneToManyA from './_OneToManyA';

type OneToManyB$Schema = {
  a: OneToManyA,
};

export default class OneToManyB
extends Record<OneToManyB$Schema> {
  _data: OneToManyB$Schema;
}
