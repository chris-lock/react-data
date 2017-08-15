// @flow

import Record from './Record';
import B from './B';
import D from './D';
import Associations from './Associations';

type ASchema = {
  b: B,
  d: D,
};

export default class A
extends Record<ASchema> {
  static associations: typeof Associations = Associations
    .oneToOne({
      from: [A, 'b'],
      to: [B, 'c']
    })
    .oneToOne({
      from: [A, 'd'],
      to: [D, 'e']
    });

  _data: ASchema;
}
