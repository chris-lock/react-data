// @flow

import DisposableManager from './DisposableManager';

export default class VersionManager
extends DisposableManager<VersionManager> {
  _version: ?string;
  _versionIndex: number = 0;

  version(): string {
    return this._version || this._setVersion();
  }

  _setVersion(): string {
    var version: Array<string> = [
          `${this._versionIndex}`
        ];

    this.prune((versionManager: VersionManager): boolean =>
      !!version.push(versionManager.version())
    );

    return this._version = version.join();
  }

  clear(): boolean {
    if (this._version) {
      this._version = null;
      this._versionIndex++;

      this.prune((versionManager: VersionManager): boolean =>
        versionManager.clear()
      );
    }

    return true;
  }
}
