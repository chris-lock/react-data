// @flow

import Writer from './Writer';

import type Record, {
  Record$Schema,
  Record$Child,
  Record$Class,
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

export type Collection$Query<Record$Schema> = (
  Query$Method<Record$Schema>
  |Query$Object<Record$Schema>
);

export default class Collection<
  Schema: Record$Schema
> extends Writer {
  _data: Array<Record$Child<Schema>> = [];
  _key: WriteKey;
  _recordClass: Record$Class<Schema>;
  _query: ?Collection$Query<Schema>;

  constructor(
    recordClass: Record$Class<Schema>,
    query?: Collection$Query<Schema>
  ) {
    super();

    this._recordClass = recordClass;
    this._query = query;
  }

  first(query: Collection$Query<Schema>): void {}

  where(query: Collection$Query<Schema>): void {}

  // foreach

  // map

  // find

  // every

  // some

  // reduce

  // reduceRight

  add(key: WriteKey, schema: Schema): void {}

  remove(key: WriteKey, query: Collection$Query<Schema>): void {}

  // _queryMethod(query: Query<Record$Schema>): Query$Method<Record$Schema> {
  //   return (typeof query === 'function')
  //     ? query
  //     : this._queryObjectMethod.bind(this, query);
  // }

  // _queryObjectMethod(query: Query$Object<Record$Schema>, schema: Record$Schema): boolean {
  //   return Object.keys(query).every(
  //     (key: string): boolean => schema[key] === query[key]
  //   );
  // }
}
