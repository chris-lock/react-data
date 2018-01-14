// @flow

import WriteOnlyIterable from './Iterable/WriteOnly';

type Listener = () => void;

export default class Listeners<Owner> {
  _listeners: WriteOnlyIterable<Owner, Listener>;

  constructor(owner: Owner) {
    this._listeners = new WriteOnlyIterable(owner);
  }

  add(...listeners: Array<Listener>): void {
    this._listeners.add(...listeners);
  }

  remove(...listeners: Array<Listener>): void {
    this._listeners.remove(...listeners);
  }

  call(owner: Owner): void {
    this._listeners
      .all(owner)
      .forEach((listener: Listener): void => listener());
  }
}
