import ResponseState from 'ResponseState';

describe('ResponseState', () => {
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
    responseState = new ResponseState;
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

  describe('FailureResponseState', () => {
    var failureResponseState;

    beforeEach(() => {
      failureResponseState = ResponseState.failure();
    });

    describe('#failure',
      itImplmentsOccuredInWindow((window) => failureResponseState.failure(window))
    );

    describe('#pending', () => {
      it('returns false', () => {
        expect(failureResponseState.pending()).toEqual(false);
        expect(failureResponseState.pending(1000)).toEqual(false);
      });
    });

    describe('#success', () => {
      it('returns false', () => {
        expect(failureResponseState.success()).toEqual(false);
        expect(failureResponseState.success(1000)).toEqual(false);
      });
    });
  });

  describe('PendingResponseState', () => {
    var pendingResponseState;

    beforeEach(() => {
      pendingResponseState = ResponseState.pending();
    });

    describe('#failure', () => {
      it('returns false', () => {
        expect(pendingResponseState.failure()).toEqual(false);
        expect(pendingResponseState.failure(1000)).toEqual(false);
      });
    });

    describe('#pending',
      itImplmentsOccuredInWindow((window) => pendingResponseState.pending(window))
    );

    describe('#success', () => {
      it('returns false', () => {
        expect(pendingResponseState.success()).toEqual(false);
        expect(pendingResponseState.success(1000)).toEqual(false);
      });
    });
  });

  describe('SuccessResponseState', () => {
    var successResponseState;

    beforeEach(() => {
      successResponseState = ResponseState.success();
    });

    describe('#failure', () => {
      it('returns false', () => {
        expect(successResponseState.failure()).toEqual(false);
        expect(successResponseState.failure(1000)).toEqual(false);
      });
    });

    describe('#pending', () => {
      it('returns false', () => {
        expect(successResponseState.pending()).toEqual(false);
        expect(successResponseState.pending(1000)).toEqual(false);
      });
    });

    describe('#success',
      itImplmentsOccuredInWindow((window) => successResponseState.success(window))
    );
  });
});
