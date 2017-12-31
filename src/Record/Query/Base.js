// @flow

import type {
  Record$Schema,
} from '../index.js';

export default class Base<
  Schema: Record$Schema,
  Props: {},
  State: {},
  Query
> {
  props: ?Props;
  query: Query;
  state: ?State;

  constructor(query: Query) {
    this.query = query;
  }

  changed(props: ?Props, state: ?State): boolean {
    return false;
  }

  matches(schema: Schema): boolean {
    return false;
  }

  updatePropsAndState(props: ?Props, state: ?State): void {
    this.props = props || this.props;
    this.state = state || this.state;
  }
}