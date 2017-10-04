import Iterable from 'Iterable';

describe('Iterable', () => {
  const iternalItem1 = {
    iternalItem1: true,
  };
  const iternalItem2 = {
    iternalItem2: true,
  };
  const iternalItem3 = {
    iternalItem3: true,
  };
  const internalArray = [
    iternalItem1,
    iternalItem2,
    iternalItem3,
  ];

  let iterable;
  let iterableSpy;
  let result;

  beforeEach(() => {
    iterable = new Iterable(internalArray);
  });

  const describeIterableMethod = (method, callCount, itMethods) => {
    describe(`#${method}`, () => {
      const description = (callCount == internalArray.length)
        ? 'calls every item'
        : 'calls until the result is found';

      beforeEach(() => {
        iterableSpy = jasmine.createSpy('iterableSpy')
          .and.callFake((item, index) => index === 1);
        result = iterable[method](iterableSpy);
      });


      it('only exposes the item and index but not the internal array', () => {
        const [item1, index1, array1] = iterableSpy.calls.argsFor(0);

        expect(item1).toBe(iternalItem1);
        expect(index1).toEqual(0);
        expect(array1).toBeUndefined();
      });

      it(description, () => {
        expect(iterableSpy.calls.count()).toEqual(callCount);

        if (callCount > 1) {
          let [item2, index2, array2] = iterableSpy.calls.argsFor(1);

          expect(item2).toBe(iternalItem2);
          expect(index2).toEqual(1);
          expect(array2).toBeUndefined();
        }

        if (callCount > 2) {
          const [item3, index3, array3] = iterableSpy.calls.argsFor(2);

          expect(item3).toBe(iternalItem3);
          expect(index3).toEqual(2);
          expect(array3).toBeUndefined();
        }
      });

      itMethods();
    });
  };

  describeIterableMethod('forEach', 3, () => {
    it('returns void', () => {
      expect(result).toBeUndefined();
    });
  });

  describeIterableMethod('map', 3, () => {
    it('returns an array of results from the method passed in', () => {
      expect(result).toEqual([false, true, false]);
    });
  });

  describeIterableMethod('find', 2, () => {
    it('returns the first result found', () => {
      expect(result).toBe(iternalItem2);
    });
  });

  describeIterableMethod('every', 1, () => {
    it('evaluates if every item matches the condition', () => {
      expect(result).toBe(false);
    });
  });

  describeIterableMethod('some', 2, () => {
    it('evaluates if any item matches the condition', () => {
      expect(result).toBe(true);
    });
  });

  describe('#includes', () => {
    it('evaluates if any item matches the item', () => {
      expect(iterable.includes(iternalItem1)).toBe(true);
      expect(iterable.includes({})).toBe(false);
    });
  });

  describe('#slice', () => {
    it('returns a portion of the internal array', () => {
      expect(iterable.slice()).toEqual([
        iternalItem1,
        iternalItem2,
        iternalItem3,
      ]);
      expect(iterable.slice(1)).toEqual([
        iternalItem2,
        iternalItem3,
      ]);
      expect(iterable.slice(-1)).toEqual([
        iternalItem3,
      ]);
      expect(iterable.slice(-2)).toEqual([
        iternalItem2,
        iternalItem3,
      ]);
      expect(iterable.slice(1, 3)).toEqual([
        iternalItem2,
        iternalItem3,
      ]);
      expect(iterable.slice(1, -1)).toEqual([
        iternalItem2,
      ]);
    });
  });

  describe('#all', () => {
    beforeEach(() => {
      result = iterable.all();
    });

    it('returns a clone of the internal array', () => {
      expect(result).not.toBe(internalArray);
      expect(result.length).toEqual(internalArray.length);
      expect(result[0]).toEqual(internalArray[0]);
      expect(result[1]).toEqual(internalArray[1]);
    });
  });
});
