// @flow

import Writer from './Writer';
import QueryManager from './QueryManager';
import RecordManager from './RecordManager';
import Iterable from './Iterable';
import Callback from './Callback';

import type {
  Query,
} from './QueryManager';
import type Record, {
  Record$Schema,
  Record$Child,
  Record$Class,
} from './Record';
import type {
  WriteKey,
} from './Writer';
import type {
  RecordManager$Callback,
} from './RecordManager';

export type Collection$Query<Schema> = Query<Schema>;

type ItterableMethod<Schema, Return> = (
  currentValue: Record$Child<Schema>,
  index: number,
  array: Array<Record$Child<Schema>>
) => Return;

export default class Collection<
  Schema: Record$Schema
>
extends Writer {
  _key: WriteKey;
  _iterable: Iterable<Record$Child<Schema>>;
  _onAddRecordsCallback: RecordManager$Callback<Schema> = new Callback(this._onAddRecords);
  _queryManager: QueryManager<Schema>;
  _recordClass: Record$Class<Schema>;
  _recordManager: RecordManager<Schema>;

  constructor(
    recordClass: Record$Class<Schema>,
    recordManager?: RecordManager<Schema>,
    query?: Collection$Query<Schema>
  ) {
    super();

    this._queryManager = new QueryManager(query);
    this._recordClass = recordClass;
    this._recordManager = recordManager || new RecordManager(
      this._key,
      this._recordClass
    );

    this._recordManager.addDependency(this._onAddRecordsCallback);
    this._onAddRecords(this._recordManager.records);
    this._iterable = new Iterable(this._queryManager.records);
  }

  _onAddRecords(records: Array<Record$Child<Schema>>): void {
    this._queryManager.addRecords(records);
  }

  first(query: Collection$Query<Schema>): Record$Child<Schema> {
    return this
      ._newRecord(({}: $Shape<Schema>))
      .asCollection(this._key, this.where(query));
  }

  _newRecord(schema: Schema): Record$Child<Schema> {
    return new this._recordClass(this._key, schema);
  }

  onFirstRecordChange(key: WriteKey, method: (data: Schema) => void): void {
    this._queryManager.onFirstRecordChange(method);
  }

  where(query: Collection$Query<Schema>): Collection<Schema> {
    return new Collection(
      this._recordClass,
      this._recordManager,
      query
    );
  }

  add(key: WriteKey, schema: Schema, ...schemas: Array<Schema>): void {
    this._recordManager.addRecords(
      [schema, ...schemas].map(this._newRecord)
    );
  }

  remove(key: WriteKey, query: Collection$Query<Schema>): void {}

  updateQueryParams<
    Props: {},
    State: {}
  >(props: ?Props, state: ?State): void {
    this._queryManager.updateParams(props, state);
  }

  version(): string {
    return this._queryManager.version();
  }

  destory(): void {
    this._onAddRecordsCallback.destory();
    this._queryManager.destory();
  }

  foreach = this._iterable.foreach;

  map = this._iterable.map;

  find = this._iterable.find;

  every = this._iterable.every;

  some = this._iterable.some;

  all = this._iterable.all;
}
