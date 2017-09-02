// @flow

import Record from './Record';
import Associations from './Associations';
import OneToManyB from './_OneToManyB';

import type {
  Record$Collection
} from './Record';
import type {
  OneToManyB$Collection,
} from './_OneToManyB';

export type OneToManyA$Collection = Record$Collection<OneToManyA>;

type OneToManyA$Schema = {
  b: OneToManyA$Collection,
};

export default class OneToManyA
extends Record<OneToManyA$Schema> {
  static associations: typeof Associations = Associations
    .oneToMany({
      from: [OneToManyA, 'b'],
      to: [OneToManyB, 'a'],
    });

  _data: OneToManyA$Schema;
}
