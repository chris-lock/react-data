// @flow

import QueryManager from './QueryManager';
import RecordManager from './RecordManager';
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
> {
  _queryManager: QueryManager<Schema>;
  _recordClass: Record$Class<Schema>;
  _recordManager: RecordManager<Schema>;
  _onAddCallback: RecordManager$Callback<Schema> = new Callback(this._onAdd);

  constructor(
    recordClass: Record$Class<Schema>,
    recordManager?: RecordManager<Schema>,
    query?: Collection$Query<Schema>
  ) {
    super();

    this._queryManager = new QueryManager(query);
    this._recordClass = recordClass;
    this._recordManager = recordManager || new RecordManager;

    this._recordManager.addDependency(this._onAddCallback);
    this._onAdd(this._recordManager.records);
  }

  _onAdd(records: Array<Record$Child<Schema>>): void {
    this._queryManager.addRecords(records);
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
    return this._records().forEach(method, thisArg);
  }

  _records(): Array<Record$Child<Schema>> {
    return this._queryManager.records;
  }

  map<Return>(method: ItterableMethod<Schema, Return>, thisArg?: any): Array<Return> {
    return this._records().map(method, thisArg);
  }

  find(method: ItterableMethod<Schema, boolean>, thisArg?: any): ?Record$Class<Schema> {
    return this._records().find(method, thisArg);
  }

  every(method: ItterableMethod<Schema, boolean>, thisArg?: any): boolean {
    return this._records().every(method, thisArg);
  }

  some(method: ItterableMethod<Schema, boolean>, thisArg?: any): boolean {
    return this._records().some(method, thisArg);
  }

  all(): Array<Record$Child<Schema>> {
    return this._records().slice(0);
  }

  add(key: WriteKey, schema: Schema, ...schemas: Array<Schema>): void {
    this._recordManager.addRecords(
      [schema, ...schemas].map((schema: Schema): Record$Child<Schema> =>
        new this._recordClass(key, schema)
      )
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
    this._onAddCallback.destory();
    this._queryManager.destory();
  }
}
