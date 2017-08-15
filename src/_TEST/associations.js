// @flow

import Record from './Record';

export function oneToOne<
  Local,
  LocalKey: $Keys<$PropertyType<Local, '_data'>>,
  Foreign,
  ForeignKey: $Keys<$PropertyType<Foreign, '_data'>>,
>(oneToOne: {
  from: [
    Class<Local> & Class<$ElementType<$PropertyType<Foreign, '_data'>, ForeignKey>>,
    LocalKey,
  ],
  to: [
    Class<Foreign> & Class<$ElementType<$PropertyType<Local, '_data'>, LocalKey>>,
    ForeignKey,
  ],
}): void {}

class Associations {
  oneToOne<
    Local,
    LocalKey: $Keys<$PropertyType<Local, '_data'>>,
    Foreign,
    ForeignKey: $Keys<$PropertyType<Foreign, '_data'>>,
  >(oneToOne: {
    from: [
      Class<Local> & Class<$ElementType<$PropertyType<Foreign, '_data'>, ForeignKey>>,
      LocalKey,
    ],
    to: [
      Class<Foreign> & Class<$ElementType<$PropertyType<Local, '_data'>, LocalKey>>,
      ForeignKey,
    ],
  }): Associations {
    return this;
  }
}

export default new Associations;
