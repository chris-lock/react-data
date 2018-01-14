// @flow

import Listeners from 'utilities/Listeners';
import StaticObjectCondition from './StaticObjectCondition';
import ComputedObjectCondition from './ComputedObjectCondition';
import FilterMethodCondition from './FilterMethodCondition';

import type {
  Condition$StaticObject,
} from './StaticObjectCondition';
import type {
  Condition$ComputedObject,
} from './ComputedObjectCondition';
import type {
  Condition$FilterMethod,
} from './FilterMethodCondition';
import type {
  Record$Schema,
  Record$Child,
} from '../index.js';
import type {
  Condition$Child
} from './Condition';
import type {
  WriteKey,
} from 'Writer';

export type Record$Query$Condition<Schema> = (
  Condition$StaticObject<Schema>
  |Condition$ComputedObject<*, *, Schema>
  |Condition$FilterMethod<*, *, Schema>
);

export default class Query<Schema: Record$Schema> {
  listeners: Listeners<Query<*>> = new Listeners(this);
  _conditions: Array<Condition$Child<Schema>> = [];

  condition(condition: Record$Query$Condition<Schema>): void {
    if (condition instanceof Function) {
      if (condition.length === 2) {
        this._conditions.push(
          new ComputedObjectCondition(condition)
        );
      } else {
        this._conditions.push(
          new FilterMethodCondition(condition)
        );
      }
    } else if (condition instanceof Object) {
      this._conditions.push(
        new StaticObjectCondition(condition)
      );
    }
  }

  update<
    Props: {},
    State: {}
  >(props: ?Props, state: ?State): void {
    if (this._changed(props, state)) {
      this.listeners.call(this);
    }
  }

  _changed<
    Props: {},
    State: {}
  >(props: ?Props, state: ?State): boolean {
    return this._conditions
      .some((condition: Condition$Child<Schema>): boolean =>
        condition.changed(props, state)
      );
  }

  filter(
    key: WriteKey,
    records: Array<Record$Child<Schema>>
  ): Array<Record$Child<Schema>> {
    return records.filter((record: Record$Child<Schema>): boolean =>
      this._matchesEveryCondition(record.data(key))
    );
  }

  _matchesEveryCondition(data: Schema): boolean {
    return this._conditions
      .every((condition: Condition$Child<Schema>): boolean =>
        condition.matches(data)
      );
  }
}
