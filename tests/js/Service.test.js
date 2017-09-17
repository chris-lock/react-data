import Service from 'Service';
import WriteKey from 'support/WriteKey';

describe('Service', () => {
  const constructorParams = {};

  let runSpy;

  beforeEach(() => {
    runSpy = spyOn(Service.prototype, '_run')
      .and.callThrough();
  });

  describe('#_run', () => {
    beforeEach(() => {
      new Service(constructorParams);
    });

    it('is called on construction', () => {
      expect(runSpy.calls.count()).toEqual(1);
    });

    it('is called with a WriteKey and the params passed to the constructor', () => {
      const [writeKey, params] = runSpy.calls.argsFor(0);

      expect(writeKey instanceof WriteKey.constructor).toBe(true);
      expect(params).toBe(constructorParams);
    });
  });
});
