// @flow

type Status = {
  failure?: ?number,
  pending?: ?number,
  success?: ?number,
};

export default class UpdatableResponse {
  static now(): number {
    return Date.now();
  }

  static failure(): UpdatableResponse {
    return new UpdatableResponse({
      failure: this.now(),
    });
  }


  static pending(updatableResponse?: UpdatableResponse): UpdatableResponse {
    var previousStatus: Status = (updatableResponse)
          ? updatableResponse.current
          : {};

    return new UpdatableResponse({
      pending: this.now(),
      ...previousStatus,
    });
  }


  static success(): UpdatableResponse {
    return new UpdatableResponse({
      success: this.now(),
    });
  }

  _status: Status = {};

  constructor(status: Status) {
    this._status = status;
  }

  get current(): Status {
    return {
      ...this._status,
    };
  }

  failure(windowInMillseconds?: number): boolean {
    return this._occuredInWindow(this._status.failure, windowInMillseconds);
  }

  pending(windowInMillseconds?: number): boolean {
    return this._occuredInWindow(this._status.pending, windowInMillseconds);
  }

  success(windowInMillseconds?: number): boolean {
    return this._occuredInWindow(this._status.success, windowInMillseconds);
  }

  _occuredInWindow(occurence: ?number, windowInMillseconds?: number): boolean {
    return (
      !!occurence
      && (
        !windowInMillseconds
        || (this.constructor.now() - windowInMillseconds) <= occurence
      )
    );
  }
}
