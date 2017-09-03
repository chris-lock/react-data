// @flow

import Writer from './Writer';

import type Record, {
  Schema,
} from './Record';
import type {
  WriteKey,
} from './Writer';

type Record$Schema<Record$Instance> = $PropertyType<Record$Instance, '_data'>;
type Query$Method<Query$Schema> = (
  schema: Query$Schema,
  props: {},
  state: {}
) => (
  boolean
  |Query$Object<Query$Schema>
);
type Query$Object<Query$Schema> = $Shape<Query$Schema>;
type Query<Query$Schema> = (
  Query$Method<Query$Schema>
  |Query$Object<Query$Schema>
);

export default class Collection<Record$Instance: Record<*>>
extends Writer {
  _data: Array<Record$Instance> = [];
  _key: WriteKey;
  _recordClass: Class<$Subtype<Record$Instance>>;
  _query: ?Query<Record$Schema<Record$Instance>>;

  constructor(
    recordClass: Class<$Subtype<Record$Instance>>,
    query?: Query<Record$Schema<Record$Instance>>
  ) {
    super();

    this._recordClass = recordClass;
    this._query = query;
  }

  first(query: Query<Record$Schema<Record$Instance>>): void {}

  where(query: $PropertyType<Record$Instance, '_data'>): void {}

  // foreach

  // map

  // find

  // every

  // some

  // reduce

  // reduceRight

  add(key: WriteKey, schema: Record$Schema<Record$Instance>): void {}

  remove(key: WriteKey, query: Query<Record$Schema<Record$Instance>>): void {}

  _queryMethod(
    query: Query<Record$Schema<Record$Instance>>
  ): Query$Method<Record$Schema<Record$Instance>> {
    return (typeof query === 'function')
      ? query
      : this._queryObjectMethod.bind(this, query);
  }

  _queryObjectMethod(
    query: Query$Object<Record$Schema<Record$Instance>>,
    schema: Record$Schema<Record$Instance>
  ): boolean {
    return Object.keys(query).every(
      (key: string): boolean => schema[key] === query[key]
    );
  }
}
