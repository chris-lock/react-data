// @flow

import Writer from './Writer';

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
  records: Array<Record$Child<Schema>> = [];
  _collections: Array<Record$Collection<Schema>> = [];
  _key: WriteKey;
  _recordClass: Record$Class<Schema>;

  constructor(recordClass: Record$Class<Schema>) {
    super();

    this._recordClass = recordClass;

    this.create(this._key, ...this._bootstrappedData());
  }

  _bootstrappedData(): Array<Schema> {
    return (typeof RECORDS === 'object' && RECORDS[this._recordClass.name])
      ? RECORDS[this._recordClass.name].records
      : [];
  }

  create(key: WriteKey, ...schemas: Array<Schema>) {
    const records = schemas.map((schema: Schema): Record$Child<Schema> =>
      new this._recordClass(this._key, schema)
    );

    this.records.push(...records);

    this._collections.forEach((collection: Record$Collection<Schema>): void => {
      collection.onCreate(...records);
    });
  }

  onUpdate(...records: Array<Record$Child<Schema>>) {
    this._collections.forEach((collection: Record$Collection<Schema>): void => {
      collection.onUpdate(...records);
    });
  }

  onDelete(...records: Array<Record$Child<Schema>>) {
    this._collections.forEach((collection: Record$Collection<Schema>): void => {
      collection.onDelete(...records);
    });
  }
}
