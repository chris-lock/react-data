// @flow

import NonIterable from 'NonIterable';
import ResponseState from 'ResponseState';

type Listener = () => void;

export default class Updatable {
  _responseState: ResponseState = new ResponseState;

  get responseState(): ResponseState {
    return this._responseState;
  }
}
