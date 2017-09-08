// @flow

import Dependency from './Dependency';

export default class DependencyManager<Dependency$Child: $Subtype<Dependency>>
extends Dependency {
  _dependencies: Array<Dependency$Child> = [];

  addDependency(dependency: Dependency$Child): void {
    this._dependencies.push(dependency);
  }

  pruneDepencies(method: (dependency: Dependency$Child) => boolean): void {
    this._dependencies = this._dependencies
      .filter((dependency: Dependency$Child): boolean =>
        !dependency.destroyed && method(dependency)
      );
  }
}
