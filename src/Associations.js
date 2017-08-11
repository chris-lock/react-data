// @flow

import Writer from 'Writer';

import type {
  WriteKey,
} from 'Writer';
import type Record from 'Record';

class Associations
extends Writer {
  belongsTo<
    B: Record<*>,
    Key: $Keys<$PropertyType<B, '_data'>>,
  >(
    a: $ElementType<$PropertyType<B, '_data'>, Key>,
    key: Key,
    b: Class<B>
  ): B {
    return new b({});
  }

  getAssociation: (a: Record<*>) => void;

  _withKey(key: WriteKey): void {
    this.getAssociation = this._getAssociation.bind(this, key);
  }

  _getAssociation(key: WriteKey, a: Record<*>): void {}
}

export default new Associations;
