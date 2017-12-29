import WriteOnlyIterable from 'helpers/Iterable/WriteOnly';

describe('WriteOnlyIterable', () => {
  const owner = {};
  const item = {};

  let writeOnlyIterable;

  beforeEach(() => {
    writeOnlyIterable = new WriteOnlyIterable(owner);
  });

  describe('._items', () => {
    it('has a private internal array', () => {
      expect(writeOnlyIterable._items instanceof Array).toBe(true);
    });
  });

  describe('.add()', () => {
    it('adds items to the internal array', () => {
      writeOnlyIterable.add(item);

      expect(writeOnlyIterable._items).toEqual([
        item,
      ]);
    });
  });

  describe('.remove()', () => {
    beforeEach(() => {
      writeOnlyIterable.add(item);
    });

    it('removes items from the internal array', () => {
      expect(writeOnlyIterable._items).toEqual([
        item,
      ]);

      writeOnlyIterable.remove(item);

      expect(writeOnlyIterable._items).toEqual([]);
    });
  });

  describe('.all()', () => {
    beforeEach(() => {
      writeOnlyIterable.add(item);
    });

    it('returns the internal array to the owner', () => {
      expect(writeOnlyIterable.all(owner))
        .toBe(writeOnlyIterable._items);
    });

    it('does not return the internal array to any non owner', () => {
      const nonOwner = {};

      expect(writeOnlyIterable.all(nonOwner)).toEqual([]);
    });
  });
});
