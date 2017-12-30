// @flow

import StaticObject from './StaticObject';
import ComputedObject from './ComputedObject';
import FilterMethod from './FilterMethod';

import type {
  Query$StaticObject,
} from './StaticObject';
import type {
  Query$ComputedObject,
} from './ComputedObject';
import type {
  Query$FilterMethod,
} from './FilterMethod';
import type {
  Record$Schema,
} from '../index.js';
import type Base from './Base';

export type Record$Query<Schema> = (
  Query$StaticObject<Schema>
  |Query$ComputedObject<*, *, Schema>
  |Query$FilterMethod<*, *, Schema>
);

export default class QueryProxy<Schema: Record$Schema> {
  _query: $Subtype<Base<Schema, *, *, *>>;

  constructor(query: Record$Query<Schema>) {
    if (query instanceof Function) {
      if (query.length === 2) {
        this._query = new ComputedObject(query);
      } else {
        this._query = new FilterMethod(query);
      }
    } else if (query instanceof Object) {
      this._query = new StaticObject(query);
    } else {
      this._query = new StaticObject({});
    }
  }

  changed<
    Props: {},
    State: {}
  >(props: ?Props, state: ?State): boolean {
    return this._query.changed(props, state);
  }

  matches(schema: Schema): boolean {
    return this._query.matches(schema);
  }
}
