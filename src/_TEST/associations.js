// @flow

export type RecordData = {};

export default class Record<Data: RecordData> {
  _data: Data;
}

export type OneToOne<
  Local: Record<*>,
  LocalKey: $Keys<$PropertyType<Local, '_data'>>,
  Foreign: Record<*>,
  ForeignKey: $Keys<$PropertyType<Foreign, '_data'>>,
> = {
  local: Class<Local> & Class<$ElementType<$PropertyType<Foreign, '_data'>, ForeignKey>>,
  localKey: LocalKey,
  foreign: Class<Foreign> & Class<$ElementType<$PropertyType<Local, '_data'>, LocalKey>>,
  foreignKey: ForeignKey,
};
export type ConciseOneToOne<
  Local: Record<*>,
  LocalKey: $Keys<$PropertyType<Local, '_data'>>,
  Foreign: Record<*>,
  ForeignKey: $Keys<$PropertyType<Foreign, '_data'>>,
> = {
  from: [
    Class<Local> & Class<$ElementType<$PropertyType<Foreign, '_data'>, ForeignKey>>,
    LocalKey,
  ],
  to: [
    Class<Foreign> & Class<$ElementType<$PropertyType<Local, '_data'>, LocalKey>>,
    ForeignKey,
  ],
};

export type OneToMany<
  Local: Record<*>,
  LocalKey: $Keys<$PropertyType<Local, '_data'>>,
  Foreign: Record<*>,
  ForeignKey: $Keys<$PropertyType<Foreign, '_data'>>,
> = {
  local: Class<Local> & Class<$ElementType<$PropertyType<Foreign, '_data'>, ForeignKey>>,
  localKey: LocalKey,
  foreign: Class<Foreign> & Class<$ElementType<$ElementType<$PropertyType<Local, '_data'>, LocalKey>, 0>>,
  foreignKey: ForeignKey,
};

export type ManyToMany<
  Local: Record<*>,
  LocalKey: $Keys<$PropertyType<Local, '_data'>>,
  Foreign: Record<*>,
  ForeignKey: $Keys<$PropertyType<Foreign, '_data'>>,
> = {
  local: Class<Local> & Class<$ElementType<$ElementType<$PropertyType<Foreign, '_data'>, ForeignKey>, 0>>,
  localKey: LocalKey,
  foreign: Class<Foreign> & Class<$ElementType<$ElementType<$PropertyType<Local, '_data'>, LocalKey>, 0>>,
  foreignKey: ForeignKey,
};

class ClassA
extends Record {
  static associations: typeof Associations = Associations
    .oneToOne({
      local: ClassA,
      localKey: 'b',
      foreign: ClassB,
      foreignKey: 'a',
    })
    .oneToMany({
      local: ClassA,
      localKey: 'c',
      foreign: ClassC,
      foreignKey: 'a',
    })
    .manyToMany({
      local: ClassA,
      localKey: 'd',
      foreign: ClassD,
      foreignKey: 'a',
    });
}
