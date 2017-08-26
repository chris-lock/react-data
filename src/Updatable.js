// @flow

import NonIterable from './NonIterable';
import UpdatableResponse from './UpdatableResponse';

import type {
  WriteKey,
} from 'Writer';

type Listener = () => void;

export default class Updatable {
  _response: UpdatableResponse = new UpdatableResponse;

  get response(): UpdatableResponse {
    return this._response;
  }

  isFailure(key: WriteKey): void {
    this._response = UpdatableResponse.failure();
  }

  isPending(key: WriteKey): void {
    this._response = UpdatableResponse.pending();
  }

  isSuccess(key: WriteKey): void {
    this._response = UpdatableResponse.success();
  }
}
