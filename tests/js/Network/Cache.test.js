import NetworkCache from 'Network/Cache';

describe('NetworkCache', () => {
  let networkCache1;
  let networkCache2;
  let networkCache3;
  let networkCache4;

  beforeEach(() => {
    //
    // 1--2---3
    //     \ /
    //      4
    //
    networkCache1 = new NetworkCache;
    networkCache2 = new NetworkCache;
    networkCache3 = new NetworkCache;
    networkCache4 = new NetworkCache;

    networkCache1.add(networkCache2);
    networkCache2.add(networkCache3);
    networkCache2.add(networkCache4);
    networkCache4.add(networkCache3);
  });

  describe('#version', () => {
    it('only sets a version when read', () => {
      expect(networkCache1._version).toBeUndefined();
      expect(networkCache2._version).toBeUndefined();
      expect(networkCache3._version).toBeUndefined();
      expect(networkCache4._version).toBeUndefined();

      expect(networkCache1.version()).toBe(1);

      expect(networkCache1._version).toBe(1);
      expect(networkCache2._version).toBeUndefined();
      expect(networkCache3._version).toBeUndefined();
      expect(networkCache4._version).toBeUndefined();
    });

    it('only updates version when cleared', () => {
      expect(networkCache1.version()).toBe(1);
      expect(networkCache1.version()).toBe(1);

      networkCache1.clear();

      expect(networkCache1.version()).toBe(2);
    });
  });

  describe('#clear', () => {
    it('clears until it hits uncleared nodes', () => {
      expect(networkCache1._version).toBeUndefined();
      expect(networkCache1.version()).toBe(1);
      expect(networkCache2._version).toBeUndefined();
      expect(networkCache3._version).toBeUndefined();
      expect(networkCache4._version).toBeUndefined();

      networkCache1.clear();

      expect(networkCache1.version()).toBe(2);
      expect(networkCache2._version).toBeUndefined();
      expect(networkCache3._version).toBeUndefined();
      expect(networkCache4._version).toBeUndefined();

      expect(networkCache1.version()).toBe(2);
      expect(networkCache2.version()).toBe(1);
      expect(networkCache3._version).toBeUndefined();
      expect(networkCache4._version).toBeUndefined();

      networkCache1.clear();

      expect(networkCache1.version()).toBe(3);
      expect(networkCache2.version()).toBe(2);
      expect(networkCache3.version()).toBe(1);
      expect(networkCache4._version).toBeUndefined();

      networkCache1.clear();

      expect(networkCache1.version()).toBe(4);
      expect(networkCache2.version()).toBe(3);
      expect(networkCache3.version()).toBe(2);
      expect(networkCache4.version()).toBe(1);
    });

    it('clears nodes in a loops', () => {
      expect(networkCache1.version()).toBe(1);
      expect(networkCache2.version()).toBe(1);
      expect(networkCache3.version()).toBe(1);
      expect(networkCache4.version()).toBe(1);

      networkCache3.clear();

      expect(networkCache3.version()).toBe(2);
      expect(networkCache4.version()).toBe(2);

      networkCache3.clear();

      expect(networkCache2.version()).toBe(2);
      expect(networkCache3.version()).toBe(3);
      expect(networkCache4.version()).toBe(3);
    });
  });
});
