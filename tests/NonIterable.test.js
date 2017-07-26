import NonIterable from 'NonIterable';

describe('NonIterable', () => {
  var object,
      array,
      nonIterable;

  beforeEach(() => {
    object = {};
    array = [object];
    nonIterable = new NonIterable(array);
  });

  describe('#add', () => {
    it('adds the item to the array', () => {
      nonIterable.add('a');

      expect(array).toEqual([{}, 'a']);
    });
  });

  describe('#remove', () => {
    it('removes the first identical item from the array', () => {
      nonIterable.remove(object);

      expect(array).toEqual([]);
    });

    it('does not remove nonidentical items from the array', () => {
      nonIterable.remove({});

      expect(array).toEqual([{}]);
    });

    it('removes the first of any items that passes an identity operator from the array', () => {
      nonIterable.add('a');
      nonIterable.add('-');
      nonIterable.add('a');
      nonIterable.add(1);
      nonIterable.add('-');
      nonIterable.add(1);

      expect(array).toEqual([{}, 'a', '-', 'a', 1, '-', 1]);

      nonIterable.remove(1);

      expect(array).toEqual([{}, 'a', '-', 'a', '-', 1]);

      nonIterable.remove('a');

      expect(array).toEqual([{}, '-', 'a', '-', 1]);
    });
  });
});
