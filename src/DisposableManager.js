// @flow

import Disposable from './Disposable';

export default class DisposableManager<Disposable$Child: $Subtype<Disposable>>
extends Disposable {
  _dependencies: Array<Disposable$Child> = [];

  addDependency(dependency: Disposable$Child): void {
    this._dependencies.push(dependency);
  }

  prune(method: (dependency: Disposable$Child) => boolean): void {
    this._dependencies = this._dependencies
      .filter((dependency: Disposable$Child): boolean =>
        !dependency.disposed && method(dependency)
      );
  }
}
