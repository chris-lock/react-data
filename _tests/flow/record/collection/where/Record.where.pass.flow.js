// @flow

import Record from 'Record';

type Pass$Schema = {
  pass: boolean,
};

class Pass
extends Record<Pass$Schema> {
  _data: Pass$Schema;
}

// @flow.describe --------------------------------------------------------------
  Pass.where({
    pass: true,
  });

// @flow.describe --------------------------------------------------------------
  Pass.where((props: {}, state: {}): Pass$Schema => ({
    pass: true,
  }));

// @flow.describe --------------------------------------------------------------
  Pass.where((props: {}, state: {}, schema: Pass$Schema): boolean => true);
