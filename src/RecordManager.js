// @flow

import CallbackManager from './CallbackManager';

import type {
  Record$Schema,
  Record$Child,
} from './Record';

export default class RecordManager<
  Schema: Record$Schema
>extends CallbackManager<Record$Child<Schema>> {
  records: Array<Record$Child<Schema>> = [];

  addRecord(record: Record$Child<Schema>) {
    this.records.push(record);

    this.run(record);
  }
}
