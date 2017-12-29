import ReadOnlyIterable from 'helpers/Iterable/ReadOnly';

describe('ReadOnlyIterable', () => {
  const internalItem1 = {};
  const internalItem2 = {};
  const internalItem3 = {};
  const internalArray = [
    internalItem1,
    internalItem2,
    internalItem3,
  ];

  let readOnlyIterable;
  let readOnlyIterableSpy;
  let result;

  beforeEach(() => {
    readOnlyIterable = new ReadOnlyIterable(internalArray);
  });

  const describeReadOnlyIterableMethod = (method, callCount, itMethods) => {
    describe(`.${method}()`, () => {
      const description = (callCount == internalArray.length)
        ? 'calls every item'
        : 'calls until the result is found';

      beforeEach(() => {
        readOnlyIterableSpy = jasmine.createSpy('readOnlyIterableSpy')
          .and.callFake((item, index) => index === 1);
        result = readOnlyIterable[method](readOnlyIterableSpy);
      });


      it('only exposes the item and index but not the internal array', () => {
        const [item1, index1, array1] = readOnlyIterableSpy.calls.argsFor(0);

        expect(item1).toBe(internalItem1);
        expect(index1).toEqual(0);
        expect(array1).toBeUndefined();
      });

      it(description, () => {
        expect(readOnlyIterableSpy.calls.count()).toEqual(callCount);

        if (callCount > 1) {
          let [item2, index2, array2] = readOnlyIterableSpy.calls.argsFor(1);

          expect(item2).toBe(internalItem2);
          expect(index2).toEqual(1);
          expect(array2).toBeUndefined();
        }

        if (callCount > 2) {
          const [item3, index3, array3] = readOnlyIterableSpy.calls.argsFor(2);

          expect(item3).toBe(internalItem3);
          expect(index3).toEqual(2);
          expect(array3).toBeUndefined();
        }
      });

      itMethods();
    });
  };

  describeReadOnlyIterableMethod('forEach', 3, () => {
    it('returns void', () => {
      expect(result).toBeUndefined();
    });
  });

  describeReadOnlyIterableMethod('map', 3, () => {
    it('returns an array of results from the method passed in', () => {
      expect(result).toEqual([false, true, false]);
    });
  });

  describeReadOnlyIterableMethod('find', 2, () => {
    it('returns the first result found', () => {
      expect(result).toBe(internalItem2);
    });
  });

  describeReadOnlyIterableMethod('every', 1, () => {
    it('evaluates if every item matches the condition', () => {
      expect(result).toBe(false);
    });
  });

  describeReadOnlyIterableMethod('some', 2, () => {
    it('evaluates if any item matches the condition', () => {
      expect(result).toBe(true);
    });
  });

  describe('.includes()', () => {
    it('evaluates if any item matches the item', () => {
      expect(readOnlyIterable.includes(internalItem1)).toBe(true);
      expect(readOnlyIterable.includes({})).toBe(false);
    });
  });

  describe('.slice()', () => {
    it('returns a portion of the internal array', () => {
      expect(readOnlyIterable.slice()).toEqual([
        internalItem1,
        internalItem2,
        internalItem3,
      ]);
      expect(readOnlyIterable.slice(1)).toEqual([
        internalItem2,
        internalItem3,
      ]);
      expect(readOnlyIterable.slice(-1)).toEqual([
        internalItem3,
      ]);
      expect(readOnlyIterable.slice(-2)).toEqual([
        internalItem2,
        internalItem3,
      ]);
      expect(readOnlyIterable.slice(1, 3)).toEqual([
        internalItem2,
        internalItem3,
      ]);
      expect(readOnlyIterable.slice(1, -1)).toEqual([
        internalItem2,
      ]);
    });
  });

  describe('.all()', () => {
    beforeEach(() => {
      result = readOnlyIterable.all();
    });

    it('returns a clone of the internal array', () => {
      expect(result).not.toBe(internalArray);
      expect(result.length).toEqual(internalArray.length);
      expect(result[0]).toEqual(internalArray[0]);
      expect(result[1]).toEqual(internalArray[1]);
    });
  });
});
