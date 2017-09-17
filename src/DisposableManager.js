// @flow

import Disposable from './Disposable';

export default class DisposableManager<Disposable$Child: $Subtype<Disposable>>
extends Disposable {
  _dependencies: Array<Disposable$Child> = [];

  addDisposable(disposable: Disposable$Child): void {
    this._dependencies.push(disposable);
  }

  prune(method: (disposable: Disposable$Child) => boolean): void {
    this._dependencies = this._dependencies
      .filter((disposable: Disposable$Child): boolean =>
        !disposable.destroyed && method(disposable)
      );
  }
}
