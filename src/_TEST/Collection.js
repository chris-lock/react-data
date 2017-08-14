// @flow

export type RecordSchema = {};

class Record<Schema: RecordSchema> {
  static collection(): Collection<Schema, *> {
    return new Collection(this);
  }

  _data: Schema;
}

class Collection<Schema: RecordSchema, Item: Record<Schema>> {
  _itemClass: Class<Item>;

  constructor(itemClass: Class<Item>) {
    this._itemClass = itemClass;
  }
}

type ClassASchema = {
  b: Array<ClassB>,
};

class ClassA
extends Record<ClassASchema> {
  _data: ClassASchema;
}

var collectionA = ClassA.collection();

type ClassBSchema = {
  a: Array<ClassA>,
};

class ClassB
extends Record<ClassBSchema> {
  _data: ClassBSchema;
}

var collectionB = ClassB.collection();

var collection: Collection<ClassASchema, *> = ClassA.collection();

export type OneToOne<
  Local: Record<*>,
  LocalKey: $Keys<$PropertyType<Local, '_data'>>,
  Foreign: Record<*>,
  ForeignKey: $Keys<$PropertyType<Foreign, '_data'>>,
> = {
  from: [
    Collection<*, Local> & Collection<*, $ElementType<$PropertyType<Foreign, '_data'>, ForeignKey>>,
    LocalKey,
  ],
  to: [
    Collection<*, Foreign> & Collection<*, $ElementType<$PropertyType<Local, '_data'>, LocalKey>>,
    ForeignKey,
  ],
};

var oneToOne: OneToOne<*, *, *, *> = {
  from: [collectionA, 'c'],
  to: [collectionB, 'a'],
};
