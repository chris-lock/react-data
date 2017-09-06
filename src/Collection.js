// @flow

import Writer from './Writer';
import RecordManager from './RecordManager';
import Callback from './Callback';

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

type ItterableMethod<Schema, Return> = (
  currentValue: Record$Child<Schema>,
  index: number,
  array: Array<Record$Child<Schema>>
) => Return;

export default class Collection<
  Schema: Record$Schema
> extends Writer {
  _key: WriteKey;
  _query: ?Collection$Query<Schema>;
  _recordClass: Record$Class<Schema>;
  _recordManager: RecordManager<Schema>;
  _records: Array<Record$Child<Schema>> = [];
  _onAddCallback: Callback<Record$Child<Schema>> = new Callback(this._onAdd);

  constructor(
    recordClass: Record$Class<Schema>,
    recordManager?: RecordManager<Schema>,
    query?: Collection$Query<Schema>
  ) {
    super();

    this._query = query;
    this._recordClass = recordClass;
    this._recordManager = recordManager || new RecordManager;
    this._records = this._recordManager.records.map();

    this._recordManager.addCallback(this._onAddCallback);
  }

  first(query: Collection$Query<Schema>): void {}

  where(query: Collection$Query<Schema>): Collection<Schema> {
    return new Collection(
      this._recordClass,
      this._recordManager,
      query
    );
  }

  foreach(method: ItterableMethod<Schema, void>, thisArg?: any): void {
    return this._records.forEach(method, thisArg);
  }

  map<Return>(method: ItterableMethod<Schema, Return>, thisArg?: any): Array<Return> {
    return this._records.map(method, thisArg);
  }

  find(method: ItterableMethod<Schema, boolean>, thisArg?: any): ?Record$Class<Schema> {
    return this._records.find(method, thisArg);
  }

  every(method: ItterableMethod<Schema, boolean>, thisArg?: any): boolean {
    return this._records.every(method, thisArg);
  }

  some(method: ItterableMethod<Schema, boolean>, thisArg?: any): boolean {
    return this._records.some(method, thisArg);
  }

  all(): Array<Record$Child<Schema>> {
    return this._records.slice(0);
  }

  add(key: WriteKey, schema: Schema): void {
    this._recordManager.addRecord(
      new this._recordClass(this._key, schema)
    );
  }

  remove(key: WriteKey, query: Collection$Query<Schema>): void {}

  destory(): void {
    this._onAddCallback.destory();
  }

  _onAdd(record: Record$Child<Schema>): void {
    this._records.push(record);
  }

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
