// @flow

import Updatable from 'Updatable';

export type RecordData = {};

export default class Record<Data: RecordData>
extends Updatable {
  _data: Data;

  constructor(data: Data) {
    super();

    this._data = data;
  }
}
