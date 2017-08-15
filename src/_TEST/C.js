// @flow

import Record from './Record';
import B from './B';
import D from './D';
import Associations from './Associations';

type CSchema = {
  b: B,
  d: D,
};

export default class C
extends Record<CSchema> {
  static associations: typeof Associations = Associations
    .oneToOne({
      from: [C, 'b'],
      to: [B, 'c']
    })
    .oneToOne({
      from: [C, 'd'],
      to: [D, 'c']
    });

  _data: CSchema;
}
