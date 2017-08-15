// @flow

import Collection from './Collection';

export type RecordSchema = {};

export default class Record<Schema: RecordSchema> {
  _data: Schema;
}
