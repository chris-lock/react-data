// @flow

import Record from './Record';

class Associations {
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
}

export default new Associations;
