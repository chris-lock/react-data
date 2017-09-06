// @flow

type Method<Arg> = (arg: Arg) => void;

export default class Callback<Arg> {
  destroyed: boolean = false;
  _method: Method<Arg>;

  constructor(method: Method<Arg>) {
    this._method = method;
  }

  run(arg: Arg): boolean {
    this._method(arg);

    return true;
  }

  destory(): void {
    this.destroyed = true;
  }
}
