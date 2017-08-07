import UpdatableResponse from 'UpdatableResponse';

describe('UpdatableResponse', () => {
  var now = Date.now(),
      responseState;

  const itImplmentsOccuredInWindow = (method) => () => {
    it('returns true if it occured in the given window', () => {
      var window = 1000;

      expect(method(window)).toEqual(true);

      now += window;

      expect(method(window)).toEqual(true);

      now += 1;

      expect(method(window)).toEqual(false);
    });
  };

  beforeEach(() => {
    spyOn(Date, 'now').and.callFake(() => now);
    responseState = new UpdatableResponse;
  });

  describe('#failure', () => {
    it('returns false', () => {
      expect(responseState.failure()).toEqual(false);
      expect(responseState.failure(1000)).toEqual(false);
    });
  });

  describe('#pending', () => {
    it('returns false', () => {
      expect(responseState.pending()).toEqual(false);
      expect(responseState.pending(1000)).toEqual(false);
    });
  });

  describe('#success', () => {
    it('returns false', () => {
      expect(responseState.success()).toEqual(false);
      expect(responseState.success(1000)).toEqual(false);
    });
  });

  describe('FailureUpdatableResponse', () => {
    var failureUpdatableResponse;

    beforeEach(() => {
      failureUpdatableResponse = UpdatableResponse.failure();
    });

    describe('#failure',
      itImplmentsOccuredInWindow((window) => failureUpdatableResponse.failure(window))
    );

    describe('#pending', () => {
      it('returns false', () => {
        expect(failureUpdatableResponse.pending()).toEqual(false);
        expect(failureUpdatableResponse.pending(1000)).toEqual(false);
      });
    });

    describe('#success', () => {
      it('returns false', () => {
        expect(failureUpdatableResponse.success()).toEqual(false);
        expect(failureUpdatableResponse.success(1000)).toEqual(false);
      });
    });
  });

  describe('PendingUpdatableResponse', () => {
    var pendingUpdatableResponse;

    beforeEach(() => {
      pendingUpdatableResponse = UpdatableResponse.pending();
    });

    describe('#failure', () => {
      it('returns false', () => {
        expect(pendingUpdatableResponse.failure()).toEqual(false);
        expect(pendingUpdatableResponse.failure(1000)).toEqual(false);
      });
    });

    describe('#pending',
      itImplmentsOccuredInWindow((window) => pendingUpdatableResponse.pending(window))
    );

    describe('#success', () => {
      it('returns false', () => {
        expect(pendingUpdatableResponse.success()).toEqual(false);
        expect(pendingUpdatableResponse.success(1000)).toEqual(false);
      });
    });
  });

  describe('SuccessUpdatableResponse', () => {
    var successUpdatableResponse;

    beforeEach(() => {
      successUpdatableResponse = UpdatableResponse.success();
    });

    describe('#failure', () => {
      it('returns false', () => {
        expect(successUpdatableResponse.failure()).toEqual(false);
        expect(successUpdatableResponse.failure(1000)).toEqual(false);
      });
    });

    describe('#pending', () => {
      it('returns false', () => {
        expect(successUpdatableResponse.pending()).toEqual(false);
        expect(successUpdatableResponse.pending(1000)).toEqual(false);
      });
    });

    describe('#success',
      itImplmentsOccuredInWindow((window) => successUpdatableResponse.success(window))
    );
  });
});
