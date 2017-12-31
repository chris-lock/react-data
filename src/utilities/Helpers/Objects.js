// @flow

import Arrays from './Arrays';

import type {
  FlatArray,
} from './Arrays';

class Objects {
  fragmentMatches<Original: {}>(
    original: Original,
    fragment: $Shape<Original>
  ): boolean {
    return (
      !!Object.keys(fragment).length
      && this._compare(
        original,
        fragment,
        Arrays.fragmentMatches,
        this.fragmentMatches
      )
    );
  }

  _compare<Original: {}>(
    original: Original,
    fragment: $Shape<Original>,
    arrayCompare: (original: FlatArray, fragment: FlatArray) => boolean,
    objectCompare: (original: Original, fragment: $Shape<Original>) => boolean
  ): boolean {
    return Object.keys(fragment).every((key: string): boolean => {
      const fragmentKey: any = fragment[key];

      if (this._isArray(fragmentKey)) {
        return arrayCompare(original[key], fragmentKey);
      } else if (this.isObject(fragmentKey)) {
        return objectCompare(original[key], fragmentKey);
      }

      return original[key] === fragmentKey;
    });
  }

  equal<Obj: {}>(a: Obj, b: Obj): boolean {
    return (
      Object.keys(b) === Object.keys(a)
      && this._compare(
        a,
        b,
        Arrays.equal,
        this.equal
      )
    );
  }

  update<Original: {}>(original: Original, update: $Shape<Original>): boolean {
    let updated: boolean = false;

    Object.keys(update).forEach((key: string): void => {
      const updateKey: any = update[key];

      if (this._isArray(updateKey) && !Arrays.equal(original[key], updateKey)) {
        original[key] = updateKey;

        updated = true;
      } else if (this.isObject(updateKey)) {
        updated = this.update(original[key], updateKey) || updated;
      } else {
        if (original[key] === updateKey) {
          original[key] = updateKey;

          updated = true;
        }
      }
    });

    return updated;
  }

  isObject(obj: any): boolean {
    return (
      typeof obj === 'object'
      && obj !== null
      && !this._isArray(obj)
    );
  }

  _isArray(obj: any): boolean {
    return Array.isArray(obj);
  }
}

export default new Objects;
