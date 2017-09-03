// @flow

import Writer from './Writer';

import type Record, {
  Schema,
} from './Record';
import type {
  WriteKey,
} from './Writer';

type Query$Method<Record$Schema> = (
  schema: Record$Schema,
  props: {},
  state: {}
) => (
  boolean
  |Query$Object<Record$Schema>
);
type Query$Object<Record$Schema> = $Shape<Record$Schema>;
type Query<Record$Schema> = (
  Query$Method<Record$Schema>
  |Query$Object<Record$Schema>
);

export default class Collection<
  Record$Instance: Record<*>,
  Record$Schema: $PropertyType<Record$Instance, '_data'>
> extends Writer {
  _data: Array<Record$Instance> = [];
  _key: WriteKey;
  _recordClass: Class<$Subtype<Record<Record$Schema>>>;
  _query: ?Query<Record$Schema>;

  constructor(
    recordClass: Class<$Subtype<Record<Record$Schema>>>,
    query?: Query<Record$Schema>
  ) {
    super();

    this._recordClass = recordClass;
    this._query = query;
  }

  find(query: Query<Record$Schema>): void {}

  where(query: Query<Record$Schema>): void {}

  add(key: WriteKey, schema: Record$Schema): void {}

  remove(key: WriteKey, query: Query<Record$Schema>): void {}

  _queryMethod(query: Query<Record$Schema>): Query$Method<Record$Schema> {
    return (typeof query === 'function')
      ? query
      : this._queryObjectMethod.bind(this, query);
  }

  _queryObjectMethod(query: Query$Object<Record$Schema>, schema: Record$Schema): boolean {
    return Object.keys(query).every(
      (key: string): boolean => schema[key] === query[key]
    );
  }
}
