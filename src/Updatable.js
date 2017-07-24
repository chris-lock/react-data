// @flow

export type Status = {
  failure: boolean,
  pending: boolean,
  success: boolean,
};
type Listener = () => void;
type Callable = Updater|Listener;
type UpdaterCallable<Item: Callable> = {
  add: (item: Item: Callable) => Updater,
  remove: (item: Item: Callable) => Updater,
};

class UpdateKey {}

export class Updater {
  listeners: UpdaterCallable<Listener> = {
    add: this._add.bind(this, this._listeners),
    remove: this._remove.bind(this, this._listeners),
  };
  parents: UpdaterCallable<Updater> = {
    add: this._add.bind(this, this._parents),
    remove: this._remove.bind(this, this._parents),
  };
  status: Status = {
    failure: false,
    pending: false,
    success: false,
  };

  _isActive: boolean = true;
  _listeners: Array<Listener> = [];
  _parents: Array<Updater> = [];
  _updateKey: UpdateKey = new UpdateKey;

  isActive(updateKey: UpdateKey): boolean {
    return this._isActive;
  }

  setFailure(updateKey: UpdateKey): Updater {
    this.status = {
      failure: true,
      pending: false,
      success: false,
    };

    return this._forEachParent(parent: Updater): void => {
      parent.setFailure(this._updateKey);
    });
  }

  setPending(updateKey: UpdateKey): Updater {
    this.status = {
      failure: false,
      pending: true,
      success: false,
    };

    return this._forEachParent(parent: Updater): void => {
      parent.setPending(this._updateKey);
    });
  }

  setSuccess(updateKey: UpdateKey): Updater {
    this.status = {
      failure: false,
      pending: false,
      success: true,
    };

    return this._forEachParent(parent: Updater): void => {
      parent.setSuccess(this._updateKey);
    });
  }

  _add<Item: Callable>(collection: Array<Item>, item: Item): Updater {
    collection.push(item);

    return this;
  }

  _remove<Item: Callable>(collection: Array<Item>, item: Item): Updater {
    var index: number = collection.indexOf(item);

    if (index >= 0) {
      collection.splice(index, 1);
    }

    return this;
  }

  _forEachParent(method: (parent: Updater) => void): Updater {
    this._parents.forEach(this._updateKey, (parent: Updater): void => {
      method(parent);
    });

    this._listeners.forEach(this._updateKey, (listener: Listener): void => listener());

    return this;
  }
}
