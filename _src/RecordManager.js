// @flow

import DisposableManager from './DisposableManager';

import type DisposableCallback from './DisposableCallback';
import type {
  Record$Schema,
  Record$Child,
  Record$Class,
} from './Record';
import type {
  WriteKey,
} from './Writer';

export type RecordManager$DisposableCallback<Schema> = DisposableCallback<Array<Record$Child<Schema>>>;

export default class RecordManager<
  Schema: Record$Schema
>extends DisposableManager<RecordManager$DisposableCallback<Schema>> {
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

    this.prune((recordManager: RecordManager$DisposableCallback<Schema>): boolean =>
      recordManager.run(records)
    );
  }

  _bootstrappedData(): Array<Schema> {
    return (RECORDS && RECORDS[this._recordClass.name])
      ? RECORDS[this._recordClass.name].records
      : [];
  }
}
