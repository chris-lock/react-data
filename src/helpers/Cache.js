// @flow

import WriteOnlyIterable from './Iterable/WriteOnly';

type Listener = () => void;

export default class Cache {
  listeners: WriteOnlyIterable<Listener> = new WriteOnlyIterable(this);
  network: WriteOnlyIterable<Cache> = new WriteOnlyIterable(this);
  version: number = 0;
  _version: number = 1;

  read(): number {
    if (this._isBroken()) {
      this.version = this._version;
    }

    return this.version;
  }

  _isBroken(): boolean {
    return this.version !== this._version;
  }

  break(): void {
    if (!this._isBroken()) {
      this._version++;

      this.network.all(this)
        .forEach((node: Cache): void => node.break());
      this.listeners.all(this)
        .forEach((listener: Listener): void => listener());
    }
  }
}
