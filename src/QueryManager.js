// @flow

import Writer from './Writer';
import VersionManager from './VersionManager';

import type Record, {
  Record$Schema,
  Record$Child,
} from './Record';
import type {
  WriteKey,
} from './Writer';

type Query$Dynamic<Props, State, Schema> = (
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
  Query$Dynamic<*, *, Schema>
  |Query$Object$Computed<*, *, Schema>
  |Query$Object$Static<Schema>
);

class StaticQueryMethod<
  Schema: Record$Schema,
  Props: {},
  State: {}
> {
  changed(props: ?Props, state: ?State): boolean {
    return false;
  }

  matches(schema: Schema): boolean {
    return true;
  }
}

class QueryMethod<
  Schema: Record$Schema,
  Query,
  Props: {},
  State: {}
>
extends StaticQueryMethod<
  Schema,
  Props,
  State
> {
  static isStatic: boolean = false;

  props: ?Props;
  query: Query;
  state: ?State;

  constructor(query: Query) {
    super();

    this.query = query;
  }

  changed(props: ?Props, state: ?State): boolean {
    return (
      !this.constructor.isStatic
      && (
        this._changed(props, this.props)
        || this._changed(state, this.state)
      )
      && this._methodChanged(props, state)
    );
  }

  _changed(comparison: ?{}, base: ?{}): boolean {
    return !!(
      comparison
      && base
      && !this.objectMatches(comparison, base)
    );
  }

  _methodChanged(props: ?Props, state: ?State): boolean {
    return true;
  }

  matches(schema: Schema): boolean {
    return true;
  }

  objectMatches<Base: {}>(
    comparison: $Shape<Base>,
    base: Base,
  ): boolean {
    return Object.keys(comparison).every(
      (key: string): boolean => base[key] === comparison[key]
    );
  }
}

class StaticObjectQueryMethod<
  Schema: Record$Schema,
  Props: {},
  State: {}
>
extends QueryMethod<
  Schema,
  Query$Object$Static<Schema>,
  Props,
  State
> {
  static isStatic: boolean = true;

  matches(schema: Schema): boolean {
    return this.objectMatches(this.query, schema);
  }
}

class ComputedObjectQueryMethod<
  Schema: Record$Schema,
  Props: {},
  State: {}
>
extends QueryMethod<
  Schema,
  Query$Object$Computed<Props, State, Schema>,
  Props,
  State
> {
  _schema: ?Query$Object$Static<Schema>;

  matches(schema: Schema): boolean {
    return (
      !!this._schema
      && this.objectMatches(this._schema, schema)
    );
  }

  _methodChanged(props: ?Props, state: ?State): boolean {
    this._updatePropsAndState(props, state);

    if (this.props && this.state) {
      let schema: Query$Object$Static<Schema> = this.query(this.props, this.state);

      if (!this._schema || !this.objectMatches(schema, this._schema)) {
        this._schema = schema;

        return true;
      }
    }

    return false;
  }

  _updatePropsAndState(props: ?Props, state: ?State): void {
    if (props) {
      this.props = props;
    }

    if (state) {
      this.state = state;
    }
  }
}

class DynamicQueryMethod<
  Schema: Record$Schema,
  Props: {},
  State: {}
>
extends QueryMethod<
  Schema,
  Query$Dynamic<Props, State, Schema>,
  Props,
  State
> {
  matches(schema: Schema): boolean {
    return (
      !!this.props
      && !!this.state
      && this.query(this.props, this.state, schema)
    );
  }
}

export default class QueryManager<Schema: Record$Schema>
extends Writer {
  records: Array<Record$Child<Schema>> = [];
  _key: WriteKey;
  _queryMethod: StaticQueryMethod<Schema, *, *>;
  _versionManager: VersionManager = new VersionManager;

  constructor(query: ?Query<Schema>) {
    super();

    if (!query) {
      this._queryMethod = new StaticQueryMethod;
    } else if (query instanceof Function) {
      if (query.length === 2) {
        this._queryMethod = new ComputedObjectQueryMethod(query);
      } else {
        this._queryMethod = new DynamicQueryMethod(query);
      }
    } else if (query instanceof Object) {
      this._queryMethod = new StaticObjectQueryMethod(query);
    }
  }

  updateParams<
    Props: {},
    State: {}
  >(props: ?Props, state: ?State): void {
    if (this._queryMethod.changed(props, state)) {
      let records: Array<Record$Child<Schema>> = this.records;

      this.records = [];
      this.addRecords(records);
    }
  }

  addRecords(records: Array<Record$Child<Schema>>): void {
    this.records.push(...this._filterRecords(records));
  }

  _filterRecords(records: Array<Record$Child<Schema>>): Array<Record$Child<Schema>> {
    return records.filter((record: Record$Child<Schema>): boolean =>
      this._queryMethod.matches(record.data(this._key))
      && record.addVersionManager(this._versionManager)
      && this._versionManager.clear()
    );
  }

  version(): string {
    return this._versionManager.version();
  }

  destory(): void {
    this._versionManager.destory();
  }
}
