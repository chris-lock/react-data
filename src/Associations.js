// @flow

import Writer from 'Writer';

import type {
  WriteKey,
} from 'Writer';
import type Record from 'Record';

class Associations
extends Writer {
  oneToOne<
    Local,
    LocalKey: $Keys<$PropertyType<Local, '_data'>>,
    Foreign,
    ForeignKey: $Keys<$PropertyType<Foreign, '_data'>>,
  >(oneToOne: {
    from: [
      Class<Local>
        & Class<Record<*>>
        & Class<$ElementType<$PropertyType<Foreign, '_data'>, ForeignKey>>,
      LocalKey,
    ],
    to: [
      Class<Foreign>
        & Class<Record<*>>
        & Class<$ElementType<$PropertyType<Local, '_data'>, LocalKey>>,
      ForeignKey,
    ],
  }): Associations {
    return this;
  }

  oneToMany<
    Local,
    LocalKey: $Keys<$PropertyType<Local, '_data'>>,
    Foreign,
    ForeignKey: $Keys<$PropertyType<Foreign, '_data'>>,
  >(oneToOne: {
    from: [
      Class<Local>
        & Class<Record<*>>
        & Class<$ElementType<$PropertyType<Foreign, '_data'>, ForeignKey>>,
      LocalKey,
    ],
    to: [
      Class<Foreign>
        & Class<Record<*>>
        & Class<$ElementType<$ElementType<$PropertyType<Local, '_data'>, LocalKey>, 0>>,
      ForeignKey,
    ],
  }): Associations {
    return this;
  }

  manyToMany<
    Local,
    LocalKey: $Keys<$PropertyType<Local, '_data'>>,
    Foreign,
    ForeignKey: $Keys<$PropertyType<Foreign, '_data'>>,
  >(oneToOne: {
    from: [
      Class<Local>
        & Class<Record<*>>
        & Class<$ElementType<$ElementType<$PropertyType<Foreign, '_data'>, ForeignKey>, 0>>,
      LocalKey,
    ],
    to: [
      Class<Foreign>
        & Class<Record<*>>
        & Class<$ElementType<$ElementType<$PropertyType<Local, '_data'>, LocalKey>, 0>>,
      ForeignKey,
    ],
  }): Associations {
    return this;
  }
}

export default new Associations;
