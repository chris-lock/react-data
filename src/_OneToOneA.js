// @flow

import Record from './Record';
import Associations from './Associations';
import OneToOneB from './_OneToOneB';

type OneToOneA$Schema = {
  b: OneToOneB,
};

export default class OneToOneA
extends Record<OneToOneA$Schema> {
  static associations: typeof Associations = Associations
    .oneToOne({
      from: [OneToOneA, 'b'],
      to: [OneToOneB, 'a'],
    });

  _data: OneToOneA$Schema;
}
