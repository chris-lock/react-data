// @flow

import Network from './index';

export default class Cache
extends Network<Cache> {
  _version: ?number;
  _versionIndex: number = 1;

  version(): number {
    return this._version || this._setVersion();
  }

  _setVersion(): number {
    return this._version = this._versionIndex;
  }

  clear(): void {
    if (this._version) {
      this._version = null;
      this._versionIndex++;

      this.forEach((cache: Cache): void => cache.clear());
    }
  }
}
