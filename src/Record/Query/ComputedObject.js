// @flow

import Base from './Base';

import type {
  Record$Schema,
} from '../index.js';

export type Query$ComputedObject<Props, State, Schema> = (
  props: Props,
  state: State
) => $Shape<Schema>;

export default class ComputedObject<
  Schema: Record$Schema,
  Props: {},
  State: {}
>
extends Base<
  Schema,
  Props,
  State,
  Query$ComputedObject<Props, State, Schema>
> {
  _computed: $Shape<Schema> = {};

  changed(props: ?Props, state: ?State): boolean {
    const changed: bool = this._changed(props, state);

    this.updatePropsAndState(props, state);

    return changed;
  }

  _changed(props: ?Props, state: ?State): boolean {
    return (
      (
        this._componentChanged(this.props, props)
        || this._componentChanged(this.state, state)
      )
      && this._computedObjectChanged(props, state)
    );
  }

  _componentChanged<Attr: {}>(prev: ?Attr, current: ?Attr): boolean {
    return !!(
      prev
      && current
      && !this._matches(prev, current)
    );
  }

  _matches<Obj: {}>(a: Obj, b: Obj): boolean {
    return (
      Object.keys(a) === Object.keys(b)
      && this.fragmentMatches(a, b)
    );
  }

  _computedObjectChanged(props: ?Props, state: ?State): boolean {
    if (props && state) {
      let computed: $Shape<Schema> = this.query(props, state);

      if (!this._matches(this._computed, computed)) {
        this._computed = computed;

        return true;
      }
    }

    return false;
  }

  matches(schema: Schema): boolean {
    return this.fragmentMatches(this._computed, schema);
  }
}
