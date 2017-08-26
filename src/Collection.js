// @flow
import Writer from './Writer';

import type Record, {
  Schema,
} from './Record';
import type {
  WriteKey,
} from './Writer';

type QueryMethod<Schema> = (schema: Schema) => boolean;
type QueryObject<Schema> = $Subtype<Schema>;
type Query<Schema> = QueryObject<Schema>|QueryMethod<Schema>;

export default class Collection<
  Schema: Schema,
  Record: $Subtype<Record<Schema>>
> extends Writer {
  _all: Array<Record> = [];
  _key: WriteKey;
  _recordClass: Class<Record>;

  constructor(recordClass: Class<Record>) {
    super();

    this._recordClass = recordClass;
  }

  all(): Array<Record> {
    return this._all.slice(0);
  }

  find(query: Query<Schema>): ?Record {
    return this.where(query)[0];
  }

  where(query: Query<Schema>): Array<Record> {
    var queryMethod: QueryMethod<Schema> = this._queryMethod(query);

    return this._all.filter(
      (record: Record): boolean => queryMethod(record.data(this._key))
    );
  }

  add(key: WriteKey, schema: Schema): Record {
    return new this._recordClass(key, schema);
  }

  remove(key: WriteKey, query: Query<Schema>): void {

  }

  _withKey(key: WriteKey): void {
    this._key = key;
  }

  _queryMethod(query: Query<Schema>): QueryMethod<Schema> {
    return (typeof query === 'function')
      ? query
      : this._queryObjectMethod.bind(this, query);
  }

  _queryObjectMethod(query: QueryObject<Schema>, schema: Schema): boolean {
    return Object.keys(query).every(
      (key: string): boolean => schema[key] === query[key]
    );
  }
}
