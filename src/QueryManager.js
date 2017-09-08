// @flow

import VersionManager from './VersionManager';

import type Record, {
  Record$Schema,
  Record$Child,
} from './Record';

type Query$Method<Props, State, Schema> = (
  props: Props,
  state: State,
  schema: Schema
) => boolean;

 type Query$Object$Computed<Props, State, Schema> = (
  props: Props,
  state: State
) => Query$Object$Static<Schema>;

type Query$Object$Static<Schema> = $Shape<Schema>;

export type Query<Schema> = (
  Query$Method<*, *, Schema>
  |Query$Object$Computed<*, *, Schema>
  |Query$Object$Static<Schema>
);

type Query$Type = {
  isComputedObject: boolean,
  isMethod: boolean,
  isStaticObject: boolean,
};

export default class QueryManager<Schema: Record$Schema> {
  records: Array<Record$Child<Schema>> = [];
  _method: ?Query$Method<Schema, *, *>;
  _type: Query$Type = {
    isComputedObject: false,
    isMethod: false,
    isStaticObject: false,
  };
  _unfilteredRecords: Array<Record$Child<Schema>> = [];
  _versionManager: VersionManager = new VersionManager;

  constructor(query: ?Query<Schema>) {
    if (query) {
      if (query instanceof Function) {
        this._method = query;

        if (query.length === 2) {
          this._type.isComputedObject = true;
        } else {
          this._type.isMethod = true;
        }
      } else if (query instanceof Object) {
        this._type.isStaticObject = true;
        this._method = this._compareObjects.bind(this, query);
      }
    }
  }

  _compareObjects<Props, State>(
    query: Query$Object<Schema>,
    schema: Schema,
    props: Props,
    state: State
  ): boolean {
    return Object.keys(query).every(
      (key: string): boolean => schema[key] === query[key]
    );
  }

  addRecords(records: Array<Record$Child<Schema>>): void {
    if (this._type.isStaticObject) {
      this._filterRecords(records, [], {}, {});
    } else {
      this._unfilteredRecords.push(...records);
    }
  }

  _filterRecords<Props, State>(
    unfliteredRecords: Array<Record$Child<Schema>>,
    previousRecords: Array<Record$Child<Schema>>,
    props: Props,
    state: State
  ): void {
    this.records.push(...unfliteredRecords.filter(
      this._filter.bind(this, previousRecords, props, state)
    ));
  }

  _filter<Props, State>(
    previousRecords: Array<Record$Child<Schema>>,
    props: Props,
    state: State,
    record: Record$Child<Schema>
  ): boolean {
    var matches: boolean = this._method({}, props, state),
        removedFromPreviousRecords: boolean = !matches && previousRecords.indexOf(record) > 0,
        addedToRecords: boolean = matches && !removedFromPreviousRecords;

    if (removedFromPreviousRecords || matches) {
      this._versionManager.clear();
    }

    if (matches) {
      // record.addVersionDependency(this._key, this._versionManager);
    }

    return matches;
  }

  version<Props, State>(
    allRecords: Array<Record$Child<Schema>>,
    props: Props,
    state: State
  ): string {
    this._filterRecordsForVersion(allRecords, props, state);

    return this._versionManager.version();
  }

  _filterRecordsForVersion<Props, State>(
    allRecords: Array<Record$Child<Schema>>,
    props: Props,
    state: State
  ): void {
    var previousRecords: Array<Record$Child<Schema>> = [];

    if (this._queryObjectHasChanged(props, state)) {
      previousRecords = this.records;

      this.records = [];
      this._unfilteredRecords = allRecords;
      this._versionManager.destory();
      this._versionManager = new VersionManager;
    }

    this._filterRecords(
      this._unfilteredRecords,
      previousRecords,
      props,
      state
    );
  }

  _queryObjectHasChanged<Props, State>(props: Props, state: State): boolean {
    return (
      !this._type.hasBeenSet
      || this._type.isMethod
      || (
        this._type.isComputedObject
        // && this.
      )
    );
  }

  destory(): void {
    this._versionManager.destory();
  }
}
