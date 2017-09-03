// @flow

import Record from 'Record';

import type Association from 'Association';

// @flow.describe --------------------------------------------------------------
  type Pass$A$Schema = {
    b: Pass$B,
  };

  class Pass$A
  extends Record<Pass$A$Schema> {
    static associations: Association<Pass$A$Schema> = this.association
      .oneToOne({
        from: 'b',
        to: [Pass$B, 'a'],
      });

    _data: Pass$A$Schema;
  }

  type Pass$B$Schema = {
    a: Pass$A,
  };

  class Pass$B
  extends Record<Pass$B$Schema> {
    _data: Pass$B$Schema;
  }
