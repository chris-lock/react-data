// @flow

export default class UpdatableResponse {
  static failure(): FailureUpdatableResponse {
    return new FailureUpdatableResponse;
  }


  static pending(): PendingUpdatableResponse {
    return new PendingUpdatableResponse;
  }


  static success(): SuccessUpdatableResponse {
    return new SuccessUpdatableResponse;
  }

  _occurance: number = this._now();

  failure(windowInMillseconds?: number): boolean {
    return false;
  }

  pending(windowInMillseconds?: number): boolean {
    return false;
  }

  success(windowInMillseconds?: number): boolean {
    return false;
  }

  occuredInWindow(windowInMillseconds?: number): boolean {
    return (
      !windowInMillseconds
      || (this._now() - windowInMillseconds) <= this._occurance
    );
  }

  _now(): number {
    return Date.now();
  }
}

class FailureUpdatableResponse
extends UpdatableResponse {
  failure(windowInMillseconds?: number): boolean {
    return this.occuredInWindow(windowInMillseconds);
  }
}

class PendingUpdatableResponse
extends UpdatableResponse {
  pending(windowInMillseconds?: number): boolean {
    return this.occuredInWindow(windowInMillseconds);
  }
}

class SuccessUpdatableResponse
extends UpdatableResponse {
  success(windowInMillseconds?: number): boolean {
    return this.occuredInWindow(windowInMillseconds);
  }
}
