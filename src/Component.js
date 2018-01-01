// @flow

import Cache from 'utilities/Cache';

export default class Component {
  data: {} = {};
  _cache: Cache = new Cache;

  onComponentWillMount(): void {
    this._cache.listeners.add(this._clearCacheAndSetState);

    Object.keys(this.data).forEach((key: string): void => {
      this._cache.network.add(this.data[key].cache());
    });
  }

  _clearCacheAndSetState(): void {
    this.setState((prevState: State, props: Props): $Shape<State> =>
      (prevState.cache === this._cache.version)
        ? {
            cache: this._cache.read(),
          }
        : {}
    );
  }
}
