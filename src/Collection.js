// @flow
import Writer from './Writer';

import type Record, {
  Schema,
} from './Record';
import type {
  WriteKey,
} from './Writer';

type QueryMethod<Record$Schema> = (schema: Record$Schema) => boolean;
type QueryObject<Record$Schema> = $Shape<Record$Schema>;
type Query<Record$Schema> = QueryObject<Record$Schema>|QueryMethod<Record$Schema>;

export default class Collection<
  Record$Schema: Schema
> extends Writer {
  _all: Array<Record$Schema> = [];
  _key: WriteKey;
  _recordClass: Class<$Subtype<Record<Record$Schema>>>;

  constructor(recordClass: Class<$Subtype<Record<Record$Schema>>>) {
    super();

    this._recordClass = recordClass;
  }

  all(): void {
    // return this._all.slice(0);
  }

  find(query: Query<Record$Schema>): void {
    // return this.where(query)[0];
  }

  where(query: Query<Record$Schema>): void {
    // var queryMethod: QueryMethod<Record$Schema> = this._queryMethod(query);

    // return this._all.filter(
    //   (record: Record): boolean => queryMethod(record.data(this._key))
    // );
  }

  add(key: WriteKey, schema: Record$Schema): void {
    // return new this._recordClass(key, schema);
  }

  remove(key: WriteKey, query: Query<Record$Schema>): void {

  }

  _withKey(key: WriteKey): void {
    this._key = key;
  }

  _queryMethod(query: Query<Record$Schema>): QueryMethod<Record$Schema> {
    return (typeof query === 'function')
      ? query
      : this._queryObjectMethod.bind(this, query);
  }

  _queryObjectMethod(query: QueryObject<Record$Schema>, schema: Record$Schema): boolean {
    return Object.keys(query).every(
      (key: string): boolean => schema[key] === query[key]
    );
  }
}
