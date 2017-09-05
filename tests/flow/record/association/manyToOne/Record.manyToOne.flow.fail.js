// @flow

import Record from 'Record';

import type Association from 'Association';
import type Collection from 'Collection';

// @flow.describe --------------------------------------------------------------
  type Fail$From$Class$A$Schema = {
    from: Fail$From$Class$B,
  };

  // @flow.test - `from` value is not current class
  type Fail$From$Class$A$Collection = Collection<Fail$From$Class$A$Schema>;

  class Fail$From$Class$A
  // @flow.test - `from` value is not current class
  extends Record<Fail$From$Class$A$Schema> {
    static associations: Association<Fail$From$Class$A$Schema> = this.association
      .manyToOne({
        from: [Fail$From$Class$__FAIL__, 'from'],
        to: [Fail$From$Class$B, 'to'],
      });

    _data: Fail$From$Class$A$Schema;
  }

  type Fail$From$Class$__FAIL__$Schema = {
    from: Fail$From$Class$B,
    // @flow.test - `from` value is not current class
    key: '__FAIL__',
  };

  class Fail$From$Class$__FAIL__
  // @flow.test - `from` value is not current class
  extends Record<Fail$From$Class$__FAIL__$Schema> {
    _data: Fail$From$Class$__FAIL__$Schema;
  }

  type Fail$From$Class$B$Schema = {
    to: Fail$From$Class$A$Collection,
  };

  class Fail$From$Class$B
  extends Record<Fail$From$Class$B$Schema> {
    _data: Fail$From$Class$B$Schema;
  }

// @flow.describe --------------------------------------------------------------
  type Fail$From$Key$A$Schema = {
    from: Fail$From$Key$B,
  };

  type Fail$From$Key$A$Collection = Collection<Fail$From$Key$A$Schema>;

  class Fail$From$Key$A
  extends Record<Fail$From$Key$A$Schema> {
    static associations: Association<Fail$From$Key$A$Schema> = this.association
      .manyToOne({
        // @flow.test - `from` key does not exist
        from: [Fail$From$Key$A, '__FAIL__'],
        to: [Fail$From$Key$B, 'to'],
      });

    _data: Fail$From$Key$A$Schema;
  }

  type Fail$From$Key$B$Schema = {
    to: Fail$From$Key$A$Collection,
  };

  class Fail$From$Key$B
  extends Record<Fail$From$Key$B$Schema> {
    _data: Fail$From$Key$B$Schema;
  }

// @flow.describe --------------------------------------------------------------
  type Fail$From$Value$A$Schema = {
    // @flow.test - `from` value is not a Record<*>
    from: '__FAIL__',
  };

  type Fail$From$Value$A$Collection = Collection<Fail$From$Value$A$Schema>;

  class Fail$From$Value$A
  extends Record<Fail$From$Value$A$Schema> {
    static associations: Association<Fail$From$Value$A$Schema> = this.association
      .manyToOne({
        from: [Fail$From$Value$A, 'from'],
        to: [Fail$From$Value$B, 'to'],
      });

    _data: Fail$From$Value$A$Schema;
  }

  type Fail$From$Value$B$Schema = {
    to: Fail$From$Value$A$Collection,
  };

  class Fail$From$Value$B
  extends Record<Fail$From$Value$B$Schema> {
    _data: Fail$From$Value$B$Schema;
  }

// @flow.describe --------------------------------------------------------------
  type Fail$To$Class$A$Schema = {
    // @flow.test - `to` class is not a Collection<*>
    from: __FAIL__,
  };

  class Fail$To$Class$A
  extends Record<Fail$To$Class$A$Schema> {
    static associations: Association<Fail$To$Class$A$Schema> = this.association
      .manyToOne({
        from: [Fail$To$Class$A, 'from'],
        // @flow.test - `to` class is not a Collection<*>
        to: [__FAIL__, 'to'],
      });

    _data: Fail$To$Class$A$Schema;
  }

  class __FAIL__ {}

// @flow.describe --------------------------------------------------------------
  type Fail$To$Key$A$Schema = {
    from: Fail$To$Key$B,
  };

  type Fail$To$Key$A$Collection = Collection<Fail$To$Key$A$Schema>;

  class Fail$To$Key$A
  extends Record<Fail$To$Key$A$Schema> {
    static associations: Association<Fail$To$Key$A$Schema> = this.association
      .manyToOne({
        from: [Fail$To$Key$A, 'from'],
        // @flow.test - `to` key does not exist
        to: [Fail$To$Key$B, '__FAIL__'],
      });

    _data: Fail$To$Key$A$Schema;
  }

  type Fail$To$Key$B$Schema = {
    to: Fail$To$Key$A$Collection,
  };

  class Fail$To$Key$B
  extends Record<Fail$To$Key$B$Schema> {
    _data: Fail$To$Key$B$Schema;
  }

// @flow.describe --------------------------------------------------------------
  type Fail$To$Value$A$Schema = {
    from: Fail$To$Value$B,
  };

  type Fail$To$Value$A$Collection = Collection<Fail$To$Value$A$Schema>;

  class Fail$To$Value$A
  extends Record<Fail$To$Value$A$Schema> {
    static associations: Association<Fail$To$Value$A$Schema> = this.association
      .manyToOne({
        from: [Fail$To$Value$A, 'from'],
        to: [Fail$To$Value$B, 'to'],
      });

    _data: Fail$To$Value$A$Schema;
  }

  type Fail$To$Value$B$Schema = {
    // @flow.test - `to` value is not a Collection<*>
    to: Fail$To$Value$A,
  };

  class Fail$To$Value$B
  extends Record<Fail$To$Value$B$Schema> {
    _data: Fail$To$Value$B$Schema;
  }

// @flow.describe --------------------------------------------------------------
  type Fail$To$Collection$A$Schema = {
    from: Fail$To$Collection$B,
  };

  type Fail$To$Collection$A$Collection = Collection<Fail$To$Collection$A$Schema>;

  class Fail$To$Collection$A
  extends Record<Fail$To$Collection$A$Schema> {
    static associations: Association<Fail$To$Collection$A$Schema> = this.association
      .manyToOne({
        from: [Fail$To$Collection$A, 'from'],
        to: [Fail$To$Collection$B, 'to'],
      });

    _data: Fail$To$Collection$A$Schema;
  }

  type Fail$To$Collection$B$Schema = {
    to: Fail$To$Collection$__FAIL__$Collection,
  };

  class Fail$To$Collection$B
  extends Record<Fail$To$Collection$B$Schema> {
    _data: Fail$To$Collection$B$Schema;
  }

  type Fail$To$Collection$__FAIL__$Schema = {
    from: Fail$To$Collection$B,
    key: '__FAIL__',
  };

  // @flow.test - `to` value is the wrong Collection<*>
  type Fail$To$Collection$__FAIL__$Collection = Collection<Fail$To$Collection$__FAIL__$Schema>;

  class Fail$To$Collection$__FAIL__
  extends Record<Fail$To$Collection$__FAIL__$Schema> {
    _data: Fail$To$Collection$B$Schema;
  }

