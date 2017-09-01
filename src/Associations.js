// @flow

import Writer from './Writer';

import type {
  WriteKey,
} from 'Writer';
import type Record from './Record';

class Associations
extends Writer {
  oneToOne<
    Local,
    LocalKey: $Keys<$PropertyType<$PropertyType<Local, '_data'>, 'current'>>,
    Foreign,
    ForeignKey: $Keys<$PropertyType<$PropertyType<Foreign, '_data'>, 'current'>>,
  >(oneToOne: {
    from: [
      Class<Local>
        & Class<$Subtype<Record<*>>>
        & Class<$ElementType<$PropertyType<$PropertyType<Foreign, '_data'>, 'current'>, ForeignKey>>,
      LocalKey,
    ],
    to: [
      Class<Foreign>
        & Class<$Subtype<Record<*>>>
        & Class<$ElementType<$PropertyType<$PropertyType<Local, '_data'>, 'current'>, LocalKey>>,
      ForeignKey,
    ],
  }): Associations {
    return this;
  }

  oneToMany<
    Local,
    LocalKey: $Keys<$PropertyType<$PropertyType<Local, '_data'>, 'current'>>,
    Foreign,
    ForeignKey: $Keys<$PropertyType<$PropertyType<Foreign, '_data'>, 'current'>>,
  >(oneToOne: {
    from: [
      Class<Local>
        & Class<$Subtype<Record<*>>>
        & Class<$ElementType<$PropertyType<$PropertyType<Foreign, '_data'>, 'current'>, ForeignKey>>,
      LocalKey,
    ],
    to: [
      Class<Foreign>
        & Class<$Subtype<Record<*>>>
        & Class<$ElementType<$ElementType<$PropertyType<$PropertyType<Local, '_data'>, 'current'>, LocalKey>, 0>>,
      ForeignKey,
    ],
  }): Associations {
    return this;
  }

  manyToMany<
    Local,
    LocalKey: $Keys<$PropertyType<$PropertyType<Local, '_data'>, 'current'>>,
    Foreign,
    ForeignKey: $Keys<$PropertyType<$PropertyType<Foreign, '_data'>, 'current'>>,
  >(oneToOne: {
    from: [
      Class<Local>
        & Class<$Subtype<Record<*>>>
        & Class<$ElementType<$ElementType<$PropertyType<$PropertyType<Foreign, '_data'>, 'current'>, ForeignKey>, 0>>,
      LocalKey,
    ],
    to: [
      Class<Foreign>
        & Class<$Subtype<Record<*>>>
        & Class<$ElementType<$ElementType<$PropertyType<$PropertyType<Local, '_data'>, 'current'>, LocalKey>, 0>>,
      ForeignKey,
    ],
  }): Associations {
    return this;
  }

  onlyToOne<
    Local,
    LocalKey: $Keys<$PropertyType<$PropertyType<Local, '_data'>, 'current'>>,
    Foreign,
    ForeignKey: $Keys<$PropertyType<$PropertyType<Foreign, '_data'>, 'current'>>,
  >(oneToOne: {
    from: [
      Local
        & $Subtype<Record<*>>
        & $ElementType<$PropertyType<$PropertyType<Foreign, '_data'>, 'current'>, ForeignKey>,
      LocalKey,
    ],
    to: [
      Class<Foreign>
        & Class<$Subtype<Record<*>>>
        & Class<$ElementType<$PropertyType<$PropertyType<Local, '_data'>, 'current'>, LocalKey>>,
      ForeignKey,
    ],
  }): Associations {
    return this;
  }

  onlyToMany<
    Local,
    LocalKey: $Keys<$PropertyType<$PropertyType<Local, '_data'>, 'current'>>,
    Foreign,
    ForeignKey: $Keys<$PropertyType<$PropertyType<Foreign, '_data'>, 'current'>>,
  >(oneToOne: {
    from: [
      Local
        & $Subtype<Record<*>>
        & $ElementType<$PropertyType<$PropertyType<Foreign, '_data'>, 'current'>, ForeignKey>,
      LocalKey,
    ],
    to: [
      Class<Foreign>
        & Class<$Subtype<Record<*>>>
        & Class<$ElementType<$ElementType<$PropertyType<$PropertyType<Local, '_data'>, 'current'>, LocalKey>, 0>>,
      ForeignKey,
    ],
  }): Associations {
    return this;
  }

  onlyToOnly<
    Local,
    LocalKey: $Keys<$PropertyType<$PropertyType<Local, '_data'>, 'current'>>,
    Foreign,
    ForeignKey: $Keys<$PropertyType<$PropertyType<Foreign, '_data'>, 'current'>>,
  >(oneToOne: {
    from: [
      Local
        & $Subtype<Record<*>>
        & $ElementType<$ElementType<$PropertyType<$PropertyType<Foreign, '_data'>, 'current'>, ForeignKey>, 0>,
      LocalKey,
    ],
    to: [
      Foreign
        & $Subtype<Record<*>>
        & $ElementType<$ElementType<$PropertyType<$PropertyType<Local, '_data'>, 'current'>, LocalKey>, 0>,
      ForeignKey,
    ],
  }): Associations {
    return this;
  }
}

export default new Associations;
