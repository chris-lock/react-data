// @flow

import DependencyManager from './DependencyManager';

import type Callback from './Callback';
import type {
  Record$Schema,
  Record$Child,
} from './Record';

export type RecordManager$Callback<Schema> = Callback<Array<Record$Child<Schema>>>;

export default class RecordManager<
  Schema: Record$Schema
>extends DependencyManager<RecordManager$Callback<Schema>> {
  records: Array<Record$Child<Schema>> = [];

  addRecords(records: Array<Record$Child<Schema>>) {
    this.records.push(...records);

    this.pruneDepencies((depency: RecordManager$Callback<Schema>): boolean =>
      depency.run(records)
    );
  }
}
