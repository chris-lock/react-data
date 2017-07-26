// @flow

import NonIterable from 'NonIterable';
import UpdateStatus from 'UpdateStatus';

type Listener = () => void;

class UpdateKey {}

export default class Updatable {
  _listeners: Array<Listener> = [];
  listeners: NonIterable<Listener> = new NonIterable(this._listerners);
  _parents: Array<Updatable> = [];
  parents: NonIterable<Updatable> = new NonIterable(this._parents);
  _status: UpdateStatus = new UpdateStatus;
  _updateKey: UpdateKey = new UpdateKey;

  get status(): UpdateStatus {
    return this._status;
  }

  isFailure(updateKey: UpdateKey): void {
    this._status = new UpdateStatus(
      UpdateStatus.failure()
    );

    this._parentIsFailure(updateKey);
  }

  childIsFailure(updateKey: UpdateKey): void {
    this._status = new UpdateStatus(
      this._status.current(),
      UpdateStatus.failure()
    );

    this._parentIsFailure(updateKey);
  }

  isPending(updateKey: UpdateKey): void {
    this._status = new UpdateStatus(
      UpdateStatus.pending()
    );

    this._parentIsPending(updateKey);
  }

  childIsPending(updateKey: UpdateKey): void {
    this._status = new UpdateStatus(
      this._status.current(),
      UpdateStatus.pending()
    );

    this._parentIsPending(updateKey);
  }

  isSuccess(updateKey: UpdateKey): void {
    this._status = new UpdateStatus(
      UpdateStatus.success()
    );

    this._parentIsSuccess(updateKey);
  }

  childIsSuccess(updateKey: UpdateKey): void {
    this._status = new UpdateStatus(
      this._status.current(),
      UpdateStatus.success()
    );

    this._parentIsSuccess(updateKey);
  }

  _parentIsFailure(updateKey: UpdateKey): void {
    this._forEachParent((parent: Updatable): void =>
      parent.childIsFailure(updateKey)
    );
  }

  _parentIsPending(updateKey: UpdateKey): void {
    this._forEachParent((parent: Updatable): void =>
      parent.childIsPending(updateKey)
    );
  }

  _parentIsSuccess(updateKey: UpdateKey): void {
    this._forEachParent((parent: Updatable): void =>
      parent.childIsSuccess(updateKey)
    );
  }

  _forEachParent(method: (parent: Updatable) => void): void {
    this._parents.forEach((parent: Updatable): void => method(parent));

    this._listeners.forEach((listener: Listener): void => listener());
  }
}
