// @flow

import Record from './Record';
import Associations from './Associations';
import OneToManyB from './_OneToManyB';

import type Collection from './Collection';

type OneToManyA$Schema = {
  b: Collection<OneToManyB, *>,
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
