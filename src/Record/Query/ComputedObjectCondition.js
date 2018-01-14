// @flow

import Condition from './Condition';
import Helpers from 'utilities/Helpers';

import type {
  Record$Schema,
} from '../index.js';

export type Condition$ComputedObject<Props, State, Schema> = (
  props: Props,
  state: State
) => $Shape<Schema>;

export default class ComputedObjectCondition<
  Schema: Record$Schema,
  Props: {},
  State: {}
>
extends Condition<
  Schema,
  Props,
  State,
  Condition$ComputedObject<Props, State, Schema>
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
      && !Helpers.objects.equal(prev, current)
    );
  }

  _computedObjectChanged(props: ?Props, state: ?State): boolean {
    if (props && state) {
      let computed: $Shape<Schema> = this.query(props, state);

      if (!Helpers.objects.equal(this._computed, computed)) {
        this._computed = computed;

        return true;
      }
    }

    return false;
  }

  matches(schema: Schema): boolean {
    return Helpers.objects.fragmentMatches(schema, this._computed);
  }
}
