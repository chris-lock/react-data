import UpdateStatus from 'UpdateStatus';

describe('UpdateStatus', () => {
  it('#initial', () => {
    expect(UpdateStatus.initial()).toEqual({
      failure: false,
      pending: false,
      success: false,
    });
  });

  it('#failure', () => {
    expect(UpdateStatus.failure()).toEqual({
      failure: true,
      pending: false,
      success: false,
    });
  });

  it('#pending', () => {
    expect(UpdateStatus.pending()).toEqual({
      failure: false,
      pending: true,
      success: false,
    });
  });

  it('#success', () => {
    expect(UpdateStatus.success()).toEqual({
      failure: false,
      pending: false,
      success: true,
    });
  });

  describe('instance', () => {
    var updateStatus;

    beforeEach(() => {
      updateStatus = new UpdateStatus;
    });

    it('defaults to initial state', () => {
      expect(updateStatus.failure).toEqual(false);
      expect(updateStatus.pending).toEqual(false);
      expect(updateStatus.success).toEqual(false);
    });

    describe('#failure', () => {
      it('is immutable', () => {
        expect(() => {
          updateStatus.failure = true;
        }).toThrow(TypeError);
      });
    });

    describe('#pending', () => {
      it('is immutable', () => {
        expect(() => {
          updateStatus.pending = true;
        }).toThrow(TypeError);
      });
    });

    describe('#success', () => {
      it('is immutable', () => {
        expect(() => {
          updateStatus.success = true;
        }).toThrow(TypeError);
      });
    });

    describe('#current', () => {
      var current;

      beforeEach(() => {
        current = updateStatus.current();
      });

      it('returns the current state', () => {
        expect(current.failure).toEqual(updateStatus.failure);
        expect(current.pending).toEqual(updateStatus.pending);
        expect(current.success).toEqual(updateStatus.success);
      });

      it('returns a new object literal', () => {
        current.failure = 'bad';

        expect(current.failure).toEqual('bad');
        expect(updateStatus.failure).toEqual(false);
      });
    });
  });
});
