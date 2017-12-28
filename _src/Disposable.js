// @flow

export default class Disposable {
  disposed: boolean = false;

  dispose(): void {
    this.disposed = true;
  }
}
