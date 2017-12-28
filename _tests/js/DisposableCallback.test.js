import DisposableCallback from 'DisposableCallback';

describe('DisposableCallback', () => {
  let disposableCallbackSpy;
  let disposableCallback;

  beforeEach(() => {
    disposableCallbackSpy = jasmine.createSpy('disposableCallbackSpy');
    disposableCallback = new DisposableCallback(disposableCallbackSpy);
  });

  describe('#run', () => {
    it('calls the method with the passed params', () => {
      const param = {};

      disposableCallback.run(param);

      expect(disposableCallbackSpy).toHaveBeenCalledWith(param);
    });
  });
});
