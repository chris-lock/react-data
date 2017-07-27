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
          updateStatus.failure = 'nope';
        }).toThrow(TypeError);
      });
    });

    describe('#pending', () => {
      it('is immutable', () => {
        expect(() => {
          updateStatus.pending = 'nope';
        }).toThrow(TypeError);
      });
    });

    describe('#success', () => {
      it('is immutable', () => {
        expect(() => {
          updateStatus.success = 'nope';
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

    describe('#children', () => {
      it('mirrors parent state', () => {
        expect(updateStatus.children.failure).toEqual(updateStatus.failure);
        expect(updateStatus.children.pending).toEqual(updateStatus.pending);
        expect(updateStatus.children.success).toEqual(updateStatus.success);
      });

      it('can be set independently', () => {
        var independentUpdateStatus = new UpdateStatus(
              UpdateStatus.success(),
              UpdateStatus.failure()
            );

        expect(independentUpdateStatus.failure).toEqual(false);
        expect(independentUpdateStatus.pending).toEqual(false);
        expect(independentUpdateStatus.success).toEqual(true);
        expect(independentUpdateStatus.children.failure).toEqual(true);
        expect(independentUpdateStatus.children.pending).toEqual(false);
        expect(independentUpdateStatus.children.success).toEqual(false);
      });

      it('is immutable', () => {
        expect(() => {
          updateStatus.children = 'nope';
        }).toThrow(TypeError);
      });

      describe('#failure', () => {
        it('is immutable', () => {
          expect(() => {
            updateStatus.children.failure = 'nope';
          }).toThrow(TypeError);
        });
      });

      describe('#pending', () => {
        it('is immutable', () => {
          expect(() => {
            updateStatus.children.pending = 'nope';
          }).toThrow(TypeError);
        });
      });

      describe('#success', () => {
        it('is immutable', () => {
          expect(() => {
            updateStatus.children.success = 'nope';
          }).toThrow(TypeError);
        });
      });

      describe('#current', () => {
        var current;

        beforeEach(() => {
          current = updateStatus.children.current();
        });

        it('returns the current state', () => {
          expect(current.failure).toEqual(updateStatus.children.failure);
          expect(current.pending).toEqual(updateStatus.children.pending);
          expect(current.success).toEqual(updateStatus.children.success);
        });

        it('returns a new object literal', () => {
          current.failure = 'bad';

          expect(current.failure).toEqual('bad');
          expect(updateStatus.children.failure).toEqual(false);
        });
      });

      describe('#children', () => {
        it('doesn’t have any', () => {
          expect(updateStatus.children.children).toBeUndefined();
        });
      });
    })
  });
});
