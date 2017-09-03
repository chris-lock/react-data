// @flow

import Record from './Record';

import type ManyToManyA from './_ManyToManyA';
import type Collection from './Collection';


type ManyToManyB$Schema = {
  a: Collection<ManyToManyA, *>,
};

export default class ManyToManyB
extends Record<ManyToManyB$Schema> {
  _data: ManyToManyB$Schema;
}
