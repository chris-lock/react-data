// @flow

import DisposableManager from './DisposableManager';

export default class VersionManager
extends DisposableManager<VersionManager> {
  _version: ?number;
  _versionIndex: number = 1;

  version(): number {
    return this._version || this._setVersion();
  }

  _setVersion(): number {
    const version = this._versionIndex;

    this._version = version;

    this.prune((dependency: VersionManager): boolean =>
      !!dependency.version()
    );

    return version;
  }

  clear(): boolean {
    if (this._version) {
      this._version = null;
      this._versionIndex++;

      this.prune((dependency: VersionManager): boolean =>
        dependency.clear()
      );
    }

    return true;
  }
}
