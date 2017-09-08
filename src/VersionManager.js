// @flow

import DependencyManager from './DependencyManager';

export default class VersionManager
extends DependencyManager<VersionManager> {
  _version: ?string;
  _versionIndex: number = 0;

  version(): string {
    return this._version || this._setVersion();
  }

  _setVersion(): string {
    var version: Array<string> = [
          `${this._versionIndex}`
        ];

    this.pruneDepencies((dependency: VersionManager): boolean =>
      !!version.push(dependency.version())
    );

    return this._version = version.join();
  }

  clear(): boolean {
    if (this._version) {
      this._version = null;
      this._versionIndex++;

      this.pruneDepencies((dependency: VersionManager): boolean =>
        dependency.clear()
      );
    }

    return true;
  }
}
