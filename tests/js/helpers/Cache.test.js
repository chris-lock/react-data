import Cache from 'helpers/Cache';

describe('Cache', () => {
  let cache;

  beforeEach(() => {
    cache = new Cache;
  });

  describe('.version', () => {
    it('initializes with a version of 0', () => {
      expect(cache.version).toBe(0);
    });
  });

  describe('.read()', () => {
    it('updates the version if the cache is broken', () => {
      expect(cache.version).toBe(0);

      cache.read();

      expect(cache.version).toBe(1);
    });

    it('doesn’t update the version if the cache is not broken', () => {
      expect(cache.version).toBe(0);

      cache.read();
      cache.read();

      expect(cache.version).toBe(1);
    });

    it('returns the updated version', () => {
      expect(cache.read()).toBe(1);
    });
  });

  describe('.break()', () => {
    it('updates the version on next read', () => {
      expect(cache.version).toBe(0);
      expect(cache.read()).toBe(1);
      expect(cache.version).toBe(1);

      cache.break();

      expect(cache.version).toBe(1);
      expect(cache.read()).toBe(2);
      expect(cache.version).toBe(2);
    });
  });

  describe('.network', () => {
    let cache1;

    beforeEach(() => {
      cache1 = new Cache;
    });

    describe('.add()', () => {
      it('breaks the cache for all nodes in it’s network', () => {
        expect(cache.version).toBe(0);
        expect(cache.read()).toBe(1);
        expect(cache1.version).toBe(0);
        expect(cache1.read()).toBe(1);

        cache.break();

        expect(cache.version).toBe(1);
        expect(cache.read()).toBe(2);
        expect(cache1.version).toBe(1);
        expect(cache1.read()).toBe(1);

        cache.network.add(cache1);

        expect(cache.version).toBe(2);
        expect(cache.read()).toBe(2);
        expect(cache1.version).toBe(1);
        expect(cache1.read()).toBe(1);

        cache.break();

        expect(cache.version).toBe(2);
        expect(cache.read()).toBe(3);
        expect(cache1.version).toBe(1);
        expect(cache1.read()).toBe(2);
      });

      it('doesn’t break parent caches', () => {
        cache.network.add(cache1);

        expect(cache.version).toBe(0);
        expect(cache.read()).toBe(1);
        expect(cache1.version).toBe(0);
        expect(cache1.read()).toBe(1);

        cache1.break();

        expect(cache.version).toBe(1);
        expect(cache.read()).toBe(1);
        expect(cache1.version).toBe(1);
        expect(cache1.read()).toBe(2);
      });
    });

    describe('.remove()', () => {
      it('no longer breaks the cache for removed nodes', () => {
        expect(cache.version).toBe(0);
        expect(cache.read()).toBe(1);
        expect(cache1.version).toBe(0);
        expect(cache1.read()).toBe(1);

        cache.network.add(cache1);
        cache.break();

        expect(cache.version).toBe(1);
        expect(cache.read()).toBe(2);
        expect(cache1.version).toBe(1);
        expect(cache1.read()).toBe(2);

        cache.network.remove(cache1);
        cache.break();

        expect(cache.version).toBe(2);
        expect(cache.read()).toBe(3);
        expect(cache1.version).toBe(2);
        expect(cache1.read()).toBe(2);
      });
    });

    describe('complex networks', () => {
      let cache2;
      let cache3;

      beforeEach(() => {
        cache2 = new Cache;
        cache3 = new Cache;

        cache.network.add(cache1);
        cache1.network.add(cache2);
        cache2.network.add(cache3);
      });

      describe('multi-tiered networks', () => {
        it('breaks the cache until it finds a already broken node', () => {
          expect(cache.version).toBe(0);
          expect(cache.read()).toBe(1);
          expect(cache1.version).toBe(0);
          expect(cache1.read()).toBe(1);
          expect(cache2.version).toBe(0);
          expect(cache2.read()).toBe(1);
          expect(cache3.version).toBe(0);
          expect(cache3.read()).toBe(1);

          cache.break();

          expect(cache.version).toBe(1);
          expect(cache.read()).toBe(2);
          expect(cache1.version).toBe(1);
          expect(cache1.read()).toBe(2);
          expect(cache2.version).toBe(1);
          expect(cache2.read()).toBe(2);
          expect(cache3.version).toBe(1);

          cache.break();

          expect(cache.version).toBe(2);
          expect(cache.read()).toBe(3);
          expect(cache1.version).toBe(2);
          expect(cache1.read()).toBe(3);
          expect(cache2.version).toBe(2);
          expect(cache3.version).toBe(1);

          cache.break();

          expect(cache.version).toBe(3);
          expect(cache.read()).toBe(4);
          expect(cache1.version).toBe(3);
          expect(cache2.version).toBe(2);
          expect(cache3.version).toBe(1);
        });
      });

      describe('circular dependencies', () => {
        it('does not create a infinite loop', () => {
          cache3.network.add(cache);

          expect(cache.version).toBe(0);
          expect(cache.read()).toBe(1);
          expect(cache1.version).toBe(0);
          expect(cache1.read()).toBe(1);
          expect(cache2.version).toBe(0);
          expect(cache2.read()).toBe(1);
          expect(cache3.version).toBe(0);
          expect(cache3.read()).toBe(1);

          cache.break();

          expect(cache.version).toBe(1);
          expect(cache.read()).toBe(2);
          expect(cache1.version).toBe(1);
          expect(cache1.read()).toBe(2);
          expect(cache2.version).toBe(1);
          expect(cache2.read()).toBe(2);
          expect(cache3.version).toBe(1);
          expect(cache3.read()).toBe(2);
        });
      });
    });
  });
});
