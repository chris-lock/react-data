// @flow

type FlatArray = Array<string|number|boolean>;

class Arrays {
  fragmentMatches(original: FlatArray, fragment: FlatArray): boolean {
    return (
      !!fragment.length
      && fragment.every((el: any, index: number): boolean =>
        original[index] === el
      )
    );
  }

  equal(a: FlatArray, b: FlatArray): boolean {
    return (
      a.length === b.length
      && a.every((el: any, index: number): boolean =>
        b[index] === el
      )
    );
  }
}

export default new Arrays;
