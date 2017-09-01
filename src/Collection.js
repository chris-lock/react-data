// @flow
import Writer from './Writer';

import type Record, {
  Schema,
} from './Record';
import type {
  WriteKey,
} from './Writer';

type QueryObject<Record$Schema> = $Shape<Record$Schema>;
type QueryMethod<
  Record$Schema,
  Component$Props,
  Component$State
> = (schema: Record$Schema, props: Component$Props, state: Component$State) => (
  boolean
  |QueryObject<Record$Schema>
);
type Query<
  Record$Schema,
  Component$Props,
  Component$State
> = (
  QueryObject<Record$Schema>
  |QueryMethod<Record$Schema, Component$Props, Component$State>
);

export default class Collection<
  Record$Schema: Schema,
  Component$Props,
  Component$State
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

  find(
    query: Query<Record$Schema, Component$Props, Component$State>
  ): Collection<Record$Schema, Component$Props, Component$State> {
    // return this.where(query)[0];
    return this;
  }

  where(
    query: Query<Record$Schema, Component$Props, Component$State>
  ): Collection<Record$Schema, Component$Props, Component$State> {
    // var queryMethod: QueryMethod<Record$Schema> = this._queryMethod(query);

    // return this._all.filter(
    //   (record: Record): boolean => queryMethod(record.data(this._key))
    // );
    return this;
  }

  add(key: WriteKey, schema: Record$Schema): void {
    // return new this._recordClass(key, schema);
  }

  remove(key: WriteKey, query: Query<Record$Schema, Component$Props, Component$State>): void {

  }

  _withKey(key: WriteKey): void {
    this._key = key;
  }

  _queryMethod(
    query: Query<Record$Schema, Component$Props, Component$State>
  ): QueryMethod<Record$Schema, Component$Props, Component$State> {
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
