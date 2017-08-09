// @flow

import NonIterable from 'NonIterable';
import UpdatableResponse from 'UpdatableResponse';

import type {
  WriteKey,
} from 'Service';

type Listener = () => void;

export default class Updatable {
  _response: UpdatableResponse = new UpdatableResponse;

  get response(): UpdatableResponse {
    return this._response;
  }

  isFailure(accessorKey: WriteKey): void {
    this._response = UpdatableResponse.failure();
  }

  isPending(accessorKey: WriteKey): void {
    this._response = UpdatableResponse.pending();
  }

  isSuccess(accessorKey: WriteKey): void {
    this._response = UpdatableResponse.success();
  }
}
