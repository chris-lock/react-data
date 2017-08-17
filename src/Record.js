// @flow

import Updatable from 'Updatable';
import Associations from 'Associations';

import type {
  WriteKey,
} from 'Writer';

export type Schema = {};

export default class Record<RecordSchema: Schema>
extends Updatable {
  _data: RecordSchema;

  constructor(key: WriteKey, data: RecordSchema) {
    super();

    this._data = data;
  }
}
