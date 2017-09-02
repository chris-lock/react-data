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
  Record$Schema: Schema
> extends Writer {
  _data: Array<Record$Schema> = [];
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

  all(): void {
    // return this._all.slice(0);
  }

  find(query: Query<Record$Schema>): void {
    // return this.where(query)[0];
  }

  where(query: Query<Record$Schema>): Collection<Record$Schema> {
    return new Collection(this._recordClass, query)
      .newData(this._key, this._data);
  }

  add(key: WriteKey, schema: Record$Schema): void {
    // return new this._recordClass(key, schema);
  }

  remove(key: WriteKey, query: Query<Record$Schema>): void {

  }

  newData(key: WriteKey, query: Array<Record$Schema>): Collection<Record$Schema> {
    return this;
  }

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
