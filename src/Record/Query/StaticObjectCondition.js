// @flow

import Condition from './Condition';
import Helpers from 'utilities/Helpers';

import type {
  Record$Schema,
} from '../index.js';

export type Condition$StaticObject<Schema> = $Shape<Schema>;

export default class StaticObjectCondition<
  Schema: Record$Schema,
  Props: {},
  State: {}
>
extends Condition<
  Schema,
  Props,
  State,
  Condition$StaticObject<Schema>
> {
  matches(schema: Schema): boolean {
    return Helpers.objects.fragmentMatches(schema, this.query);
  }
}
