// @flow

import Record from 'Record';

import type Association from 'Association';
import type Collection from 'Collection';

// @flow.describe --------------------------------------------------------------
  type Pass$A$Schema = {
    b: Pass$B$Collection,
  };

  type Pass$A$Collection = Collection<Pass$A$Schema>;

  class Pass$A
  extends Record<Pass$A$Schema> {
    static associations: Association<Pass$A$Schema> = this.association
      .manyToMany({
        from: [Pass$A, 'b'],
        to: [Pass$B, 'a'],
      });

    _data: Pass$A$Schema;
  }

  type Pass$B$Schema = {
    a: Pass$A$Collection,
  };

  type Pass$B$Collection = Collection<Pass$B$Schema>;

  class Pass$B
  extends Record<Pass$B$Schema> {
    _data: Pass$B$Schema;
  }
