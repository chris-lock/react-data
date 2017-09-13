// @flow

import DependencyManager from './DependencyManager';

import type Callback from './Callback';
import type {
  Record$Schema,
  Record$Child,
  Record$Class,
} from './Record';
import type {
  WriteKey,
} from './Writer';

export type RecordManager$Callback<Schema> = Callback<Array<Record$Child<Schema>>>;

export default class RecordManager<
  Schema: Record$Schema
>extends DependencyManager<RecordManager$Callback<Schema>> {
  records: Array<Record$Child<Schema>> = [];
  _recordClass: Record$Class<Schema>;

  constructor(key: WriteKey, recordClass: Record$Class<Schema>) {
    super();

    this._recordClass = recordClass;

    this.addRecords(
      this._bootstrappedData().map((data: Schema): Record$Child<Schema> =>
        new recordClass(key, data)
      )
    );
  }

  addRecords(records: Array<Record$Child<Schema>>) {
    this.records.push(...records);

    this.pruneDepencies((depency: RecordManager$Callback<Schema>): boolean =>
      depency.run(records)
    );
  }

  _bootstrappedData(): Array<Schema> {
    return (RECORDS && RECORDS[this._recordClass.name])
      ? RECORDS[this._recordClass.name].records
      : [];
  }
}
