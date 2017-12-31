// @flow

import Base from './Base';
import Helpers from 'utilities/Helpers';

import type {
  Record$Schema,
} from '../index.js';

export type Query$StaticObject<Schema> = $Shape<Schema>;

export default class StaticObject<
  Schema: Record$Schema,
  Props: {},
  State: {}
>
extends Base<
  Schema,
  Props,
  State,
  Query$StaticObject<Schema>
> {
  matches(schema: Schema): boolean {
    return Helpers.objects.fragmentMatches(schema, this.query);
  }
}
