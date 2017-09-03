// @flow

import Record from './Record';
import Associations from './Associations';
import ManyToManyB from './_ManyToManyB';

import type Collection from './Collection';

type ManyToManyA$Schema = {
  b: Collection<ManyToManyB, *>,
};

export default class ManyToManyA
extends Record<ManyToManyA$Schema> {
  static associations: typeof Associations = Associations
    .manyToMany({
      from: [ManyToManyA, 'b'],
      to: [ManyToManyB, 'a'],
    });

  _data: ManyToManyA$Schema;
}
