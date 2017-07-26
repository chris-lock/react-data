// @flow

type Status = {
  failure: boolean,
  pending: boolean,
  success: boolean,
};

class UpdateStatusChild {
  static initial(): Status {
    return {
      failure: false,
      pending: false,
      success: false,
    };
  }

  static failure(): Status {
    return {
      failure: true,
      pending: false,
      success: false,
    };
  }

  static pending(): Status {
    return {
      failure: false,
      pending: true,
      success: false,
    };
  }

  static success(): Status {
    return {
      failure: false,
      pending: false,
      success: true,
    };
  }

  _state: Status = this.constructor.initial();

  constructor(state?: Status) {
    if (state) {
      this._state = state;
    }
  }

  get failure(): boolean {
    return this._state.failure;
  }

  get pending(): boolean {
    return this._state.pending;
  }

  get success(): boolean {
    return this._state.success;
  }

  current(): Status {
    return {
      ...this._state,
    };
  }
}

export default class UpdateStatus
extends UpdateStatusChild {

  _children: UpdateStatusChild = new UpdateStatusChild;

  constructor(state?: Status, children?: Status) {
    super(state);

    this._children = new UpdateStatusChild(children || this.current());
  }

  get children(): UpdateStatusChild {
    return this._children;
  }
}
