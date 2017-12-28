// @flow

import Disposable from './Disposable';

type Method<Arg> = (arg: Arg) => void;

export default class DisposableCallback<Arg>
extends Disposable {
  _method: Method<Arg>;

  constructor(method: Method<Arg>) {
    super();

    this._method = method;
  }

  run(arg: Arg): boolean {
    this._method(arg);

    return true;
  }
}
