// @flow

import Writer from './Writer';
import WriteOnlyIterable from 'utilities/Iterable/WriteOnly';
import Collection from './Collection';

import type {
  Record$Schema,
  Record$Child,
  Record$Class,
} from './index';
import type {
  WriteKey,
} from './Writer';

export default class Table<Schema: Record$Schema>
extends Writer {
  collections: WriteOnlyIterable<Table<Schema>, Collection<Schema>>
    = new WriteOnlyIterable(this);
  records: WriteOnlyIterable<WriteKey, Record$Child<Schema>>
    = new WriteOnlyIterable(this._key);
  _key: WriteKey;
  _recordClass: Record$Class<Schema>;

  constructor(recordClass: Record$Class<Schema>) {
    super();

    this._recordClass = recordClass;
    this.create(this._key, ...this._bootstrappedData());
  }

  _bootstrappedData(): Array<Schema> {
    return (typeof RECORDS === 'object' && RECORDS[this._recordClass.name])
      ? RECORDS[this._recordClass.name]
      : [];
  }

  create(
    key: WriteKey,
    ...dataSets: Array<Schema>
  ): Array<Record$Child<Schema>> {
    const records = dataSets.map((data: Schema): Record$Child<Schema> =>
        new this._recordClass(this._key, data)
      );

    this.records.add(...records);

    this.collections.all(this)
      .forEach((collection: Collection<Schema>): void => {
        collection.onCreate(key, ...records);
      });

    return records;
  }

  onUpdate(key: WriteKey, ...records: Array<Record$Child<Schema>>): void {
    this.collections.all(this)
      .forEach((collection: Collection<Schema>): void => {
        collection.onUpdate(key, ...records);
      });
  }

  onDestory(key: WriteKey, ...records: Array<Record$Child<Schema>>): void {
    this.records.remove(...records);

    this.collections.all(this)
      .forEach((collection: Collection<Schema>): void => {
        collection.onDestory(key, ...records);
      });
  }
}
