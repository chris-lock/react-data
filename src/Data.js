// @flow

import Updater from './Updater';

import type {
  DataStatus,
} from './Updater';

class Data<Data> {
  status: DataStatus;
  _data: Data;
  _updater: Updater;

  constructor(data: Data, parentUpdater?: Updater) {
    this._data = data;
    this._updater = new Updater(parentUpdater);
    this.status = this._updater.status;
  }

  subscribe(callbackToAdd: Callback): void {
    this._updater.subscribe(callbackToAdd);
  }

  unsubscribe(callbackToRemove: Callback): void {
    this._updater.unsubscribe(callbackToRemove);
  }
}
