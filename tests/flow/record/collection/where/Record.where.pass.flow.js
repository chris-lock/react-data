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
  Pass.where((schema: Pass$Schema, props: {}, state: {}): Pass$Schema => ({
    pass: true,
  }));

// @flow.describe --------------------------------------------------------------
  Pass.where((schema: Pass$Schema, props: {}, state: {}): boolean => true);
