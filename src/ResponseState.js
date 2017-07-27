// @flow

export default class ResponseState {
  static failure(): FailureResponseState {
    return new FailureResponseState;
  }


  static pending(): PendingResponseState {
    return new PendingResponseState;
  }


  static success(): SuccessResponseState {
    return new SuccessResponseState;
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

class FailureResponseState
extends ResponseState {
  failure(windowInMillseconds?: number): boolean {
    return this.occuredInWindow(windowInMillseconds);
  }
}

class PendingResponseState
extends ResponseState {
  pending(windowInMillseconds?: number): boolean {
    return this.occuredInWindow(windowInMillseconds);
  }
}

class SuccessResponseState
extends ResponseState {
  success(windowInMillseconds?: number): boolean {
    return this.occuredInWindow(windowInMillseconds);
  }
}
