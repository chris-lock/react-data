// @flow

type Listener = () => void;
type Callable = Updater|Listener;
type ModifiableCollection<Item: Callable> = {
  add: (item: Item) => Callable,
  remove: (item: Item) => Callable,
};

class UpdateKey {}

type StatusState = {
  failure: boolean,
  pending: boolean,
  success: boolean,
};

export class Status {
  _state: StatusState = {
    failure: false,
    pending: false,
    success: false,
  };

  constructor(state: StatusState) {
    this._state = state;
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
}

export class Updater {
  listeners: ModifiableCollection<Listener> = this._modifiableCollection(this._listeners);
  parents: ModifiableCollection<Updater> = this._modifiableCollection(this._parents);
  _status: Status = new Status({
    failure: false,
    pending: false,
    success: false,
  });

  _listeners: Array<Listener> = [];
  _parents: Array<Updater> = [];
  _updateKey: UpdateKey = new UpdateKey;

  get status(): Status {
    return this._status;
  }

  setFailure(updateKey: UpdateKey): Updater {
    this._status = new Status({
      failure: true,
      pending: false,
      success: false,
    });

    return this._forEachParent((parent: Updater): void => {
      parent.setFailure(this._updateKey);
    });
  }

  setPending(updateKey: UpdateKey): Updater {
    this._status = new Status({
      failure: false,
      pending: true,
      success: false,
    });

    return this._forEachParent((parent: Updater): void => {
      parent.setPending(this._updateKey);
    });
  }

  setSuccess(updateKey: UpdateKey): Updater {
    this._status = new Status({
      failure: false,
      pending: false,
      success: true,
    });

    return this._forEachParent((parent: Updater): void => {
      parent.setSuccess(this._updateKey);
    });
  }

  _modifiableCollection<Item: Callable>(collection: Array<Item>): ModifiableCollection<Item> {
    return {
      add: this._addToCollection.bind(this, collection),
      remove: this._removeFromCollection.bind(this, collection),
    };
  }

  _addToCollection<Item: Callable>(collection: Array<Item>, item: Item): Updater {
    collection.push(item);

    return this;
  }

  _removeFromCollection<Item: Callable>(collection: Array<Item>, item: Item): Updater {
    var index: number = collection.indexOf(item);

    if (index >= 0) {
      collection.splice(index, 1);
    }

    return this;
  }

  _forEachParent(method: (parent: Updater) => void): Updater {
    this._parents.forEach((parent: Updater): void => {
      method(parent);
    });

    this._listeners.forEach((listener: Listener): void => listener());

    return this;
  }
}

// Updater.listeners.add
// Updater.listeners.remove
//
// Updater.parents.add
// Updater.parents.remove
//
// Updater.isFailure
// Updater.childIsFailure
// Updater.isPending
// Updater.childIsPending
// Updater.isSuccess
// Updater.childIsSuccess
