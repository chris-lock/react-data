// @flow

import Dependency from './Dependency';

type Method<Arg> = (arg: Arg) => void;

export default class Callback<Arg>
extends Dependency {
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
