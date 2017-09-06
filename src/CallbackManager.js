// @flow

import type Callback from './Callback';

export default class CallbackManager<Arg> {
  _callbacks: Array<Callback<Arg>> = [];

  addCallback(callback: Callback<Arg>): void {
    this._callbacks.push(callback);
  }

  run(arg: Arg): void {
    this._callbacks = this._callbacks
      .filter((callback: Callback<Arg>): boolean =>
        !callback.destroyed || callback.run(arg)
      );
  }
}
