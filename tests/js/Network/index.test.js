import Network from 'Network';

describe('Network', () => {
  let network1;
  let network2;
  let network3;

  beforeEach(() => {
    network1 = new Network;
    network2 = new Network;
    network3 = new Network;

    network1.add(network2);
    network2.add(network3);
    network3.add(network1);
  });

  describe('#add', () => {
    it('adds itself reciprocally', () => {
      expect(network1._subNetwork).toEqual([
        network2,
        network3,
      ]);
      expect(network2._subNetwork).toEqual([
        network1,
        network3,
      ]);
      expect(network3._subNetwork).toEqual([
        network2,
        network1,
      ]);
    });
  });

  describe('#remove', () => {
    it('removes itself reciprocally', () => {
      network1.remove(network2);

      expect(network1._subNetwork).toEqual([
        network3,
      ]);
      expect(network2._subNetwork).toEqual([
        network3,
      ]);
      expect(network3._subNetwork).toEqual([
        network2,
        network1,
      ]);
    });
  });

  describe('#forEach', () => {
    let forEachSpy;

    beforeEach(() => {
      forEachSpy = jasmine.createSpy('forEachSpy');
    });

    it('calls the method with each network', () => {
      network1.forEach(forEachSpy);

      expect(forEachSpy.calls.argsFor(0)).toEqual([network2]);
      expect(forEachSpy.calls.argsFor(1)).toEqual([network3]);
    });
  });
});
