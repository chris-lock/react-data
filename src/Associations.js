// @flow

import Writer from './Writer';

import type {
  WriteKey,
} from 'Writer';
import type Record from './Record';

type Data<Record, Key> = $ElementType<$PropertyType<Record, '_data'>, Key>;
type One<Record, Key> = Class<Data<Record, Key>>;
type Many<Record, Key> = Class<$ElementType<$PropertyType<Data<Record, Key>, '_data'>, 0>>;

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
        & Class<$Subtype<Record<*>>>
        & One<Foreign, ForeignKey>,
      LocalKey,
    ],
    to: [
      Class<Foreign>
        & Class<$Subtype<Record<*>>>
        & One<Local, LocalKey>,
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
        & Class<$Subtype<Record<*>>>
        & One<Foreign, ForeignKey>,
      LocalKey,
    ],
    to: [
      Class<Foreign>
        & Class<$Subtype<Record<*>>>
        & Many<Local, LocalKey>,
      ForeignKey,
    ],
  }): Associations {
    return this;
  }

  manyToOne<
    Local,
    LocalKey: $Keys<$PropertyType<Local, '_data'>>,
    Foreign,
    ForeignKey: $Keys<$PropertyType<Foreign, '_data'>>,
  >(oneToOne: {
    from: [
      Class<Local>
        & Class<$Subtype<Record<*>>>
        & Many<Foreign, ForeignKey>,
      LocalKey,
    ],
    to: [
      Class<Foreign>
        & Class<$Subtype<Record<*>>>
        & One<Local, LocalKey>,
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
        & Class<$Subtype<Record<*>>>
        & Many<Foreign, ForeignKey>,
      LocalKey,
    ],
    to: [
      Class<Foreign>
        & Class<$Subtype<Record<*>>>
        & Many<Local, LocalKey>,
      ForeignKey,
    ],
  }): Associations {
    return this;
  }
}

export default new Associations;
