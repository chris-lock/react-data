// @flow

import Condition from './Condition';

import type {
  Record$Schema,
} from '../index.js';

export type Condition$FilterMethod<Props, State, Schema> = (
  props: Props,
  state: State,
  schema: Schema
) => boolean;

export default class FilterMethodCondition<
  Schema: Record$Schema,
  Props: {},
  State: {}
>
extends Condition<
  Schema,
  Props,
  State,
  Condition$FilterMethod<Props, State, Schema>
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
