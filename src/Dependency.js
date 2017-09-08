// @flow

export default class Dependency {
  destroyed: boolean = false;

  destory(): void {
    this.destroyed = true;
  }
}
