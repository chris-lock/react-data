// @flow

class Key {}

const KEY: Key = new Key;

export type WriteKey = Key;

export default class Writer {
  _key: WriteKey = KEY;

  constructor() {
    this._withKey(this._key);
  }

  _withKey(key: WriteKey): void {}
}
