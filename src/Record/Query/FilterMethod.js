// @flow

import Base from './Base';

import type {
  Record$Schema,
} from '../index.js';

export type Query$FilterMethod<Props, State, Schema> = (
  props: Props,
  state: State,
  schema: Schema
) => boolean;

export default class FilterMethod<
  Schema: Record$Schema,
  Props: {},
  State: {}
>
extends Base<
  Schema,
  Props,
  State,
  Query$FilterMethod<Props, State, Schema>
> {
  props: ?Props;
  state: ?State;

  changed(props: ?Props, state: ?State): boolean {
    this.updatePropsAndState(props, state);

    return true;
  }

  matches(schema: Schema): boolean {
    return !!(
      this.props
      && this.state
      && this.query(this.props, this.state, schema)
    );
  }
}
