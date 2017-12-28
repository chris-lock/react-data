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
  Pass.first({
    pass: true,
  });

// @flow.describe --------------------------------------------------------------
  Pass.first((props: {}, state: {}): Pass$Schema => ({
    pass: true,
  }));

// @flow.describe --------------------------------------------------------------
  Pass.first((props: {}, state: {}, schema: Pass$Schema): boolean => true);
