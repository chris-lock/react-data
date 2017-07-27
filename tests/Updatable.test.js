import Updatable from 'Updatable';

describe('Updatable', () => {
  var updatable;

  beforeEach(() => {
    updatable = new Updatable;
  });

  describe('#status', () => {
    it('is immutable', () => {
      expect(() => {
        updatable.status = 'nope';
      }).toThrow(TypeError);
    });
  });

  describe('isFailure', () => {
    it('updates status', () => {
      updatable.isFailure(updatable._updateKey);

      expect(updatable.status.failure).toEqual(true);
      expect(updatable.status.pending).toEqual(false);
      expect(updatable.status.success).toEqual(false);
      expect(updatable.status.children.failure).toEqual(true);
      expect(updatable.status.children.pending).toEqual(false);
      expect(updatable.status.children.success).toEqual(false);
    });
  });

  describe('isPending', () => {
    it('updates status', () => {
      updatable.isPending(updatable._updateKey);

      expect(updatable.status.failure).toEqual(false);
      expect(updatable.status.pending).toEqual(true);
      expect(updatable.status.success).toEqual(false);
      expect(updatable.status.children.failure).toEqual(false);
      expect(updatable.status.children.pending).toEqual(true);
      expect(updatable.status.children.success).toEqual(false);
    });
  });

  describe('isSuccess', () => {
    it('updates status', () => {
      updatable.isSuccess(updatable._updateKey);

      expect(updatable.status.failure).toEqual(false);
      expect(updatable.status.pending).toEqual(false);
      expect(updatable.status.success).toEqual(true);
      expect(updatable.status.children.failure).toEqual(false);
      expect(updatable.status.children.pending).toEqual(false);
      expect(updatable.status.children.success).toEqual(true);
    });
  });

  describe('#listeners', () => {
    var listener;

    beforeEach(() => {
      listener = jasmine.createSpy();
      updatable.listeners.add(listener);
    });

    it('is called on any status change', () => {
      updatable.isSuccess(updatable._updateKey);

      expect(listener.calls.count()).toEqual(1);

      updatable.isFailure(updatable._updateKey);

      expect(listener.calls.count()).toEqual(2);

      updatable.isPending(updatable._updateKey);

      expect(listener.calls.count()).toEqual(3);
    });

    it('is not called once it’s removed', () => {
      updatable.listeners.remove(listener);

      updatable.isSuccess(updatable._updateKey);

      expect(listener.calls.count()).toEqual(0);

      updatable.isFailure(updatable._updateKey);

      expect(listener.calls.count()).toEqual(0);

      updatable.isPending(updatable._updateKey);

      expect(listener.calls.count()).toEqual(0);
    });
  });

  describe('#parents', () => {
    var updatableParent,
        updatableGrandParent;

    beforeEach(() => {
      updatableParent = new Updatable;
      updatableGrandParent = new Updatable;

      updatableParent.parents.add(updatableGrandParent);
      updatable.parents.add(updatableParent);
    });

    describe('isFailure', () => {
      it('updates all ancestors children status', () => {
        updatable.isFailure(updatable._updateKey);

        expect(updatableParent.status.failure).toEqual(false);
        expect(updatableParent.status.pending).toEqual(false);
        expect(updatableParent.status.success).toEqual(false);
        expect(updatableParent.status.children.failure).toEqual(true);
        expect(updatableParent.status.children.pending).toEqual(false);
        expect(updatableParent.status.children.success).toEqual(false);
        expect(updatableGrandParent.status.failure).toEqual(false);
        expect(updatableGrandParent.status.pending).toEqual(false);
        expect(updatableGrandParent.status.success).toEqual(false);
        expect(updatableGrandParent.status.children.failure).toEqual(true);
        expect(updatableGrandParent.status.children.pending).toEqual(false);
        expect(updatableGrandParent.status.children.success).toEqual(false);
      });
    });

    describe('isPending', () => {
      it('updates all ancestors children status', () => {
        updatable.isPending(updatable._updateKey);

        expect(updatableParent.status.failure).toEqual(false);
        expect(updatableParent.status.pending).toEqual(false);
        expect(updatableParent.status.success).toEqual(false);
        expect(updatableParent.status.children.failure).toEqual(false);
        expect(updatableParent.status.children.pending).toEqual(true);
        expect(updatableParent.status.children.success).toEqual(false);
        expect(updatableGrandParent.status.failure).toEqual(false);
        expect(updatableGrandParent.status.pending).toEqual(false);
        expect(updatableGrandParent.status.success).toEqual(false);
        expect(updatableGrandParent.status.children.failure).toEqual(false);
        expect(updatableGrandParent.status.children.pending).toEqual(true);
        expect(updatableGrandParent.status.children.success).toEqual(false);
      });
    });

    describe('isSuccess', () => {
      it('updates all ancestors children status', () => {
        updatable.isSuccess(updatable._updateKey);

        expect(updatableParent.status.failure).toEqual(false);
        expect(updatableParent.status.pending).toEqual(false);
        expect(updatableParent.status.success).toEqual(false);
        expect(updatableParent.status.children.failure).toEqual(false);
        expect(updatableParent.status.children.pending).toEqual(false);
        expect(updatableParent.status.children.success).toEqual(true);
        expect(updatableGrandParent.status.failure).toEqual(false);
        expect(updatableGrandParent.status.pending).toEqual(false);
        expect(updatableGrandParent.status.success).toEqual(false);
        expect(updatableGrandParent.status.children.failure).toEqual(false);
        expect(updatableGrandParent.status.children.pending).toEqual(false);
        expect(updatableGrandParent.status.children.success).toEqual(true);
      });
    });

    describe('#listeners', () => {
      var listenerParent,
          listenerGrandParent;

      beforeEach(() => {
        listenerParent = jasmine.createSpy();
        updatableParent.listeners.add(listenerParent);
        listenerGrandParent = jasmine.createSpy();
        updatableGrandParent.listeners.add(listenerGrandParent);
      });

      it('are called for all ancestors on any status change', () => {
        updatable.isSuccess(updatable._updateKey);

        expect(listenerParent.calls.count()).toEqual(1);
        expect(listenerGrandParent.calls.count()).toEqual(1);

        updatable.isFailure(updatable._updateKey);

        expect(listenerParent.calls.count()).toEqual(2);
        expect(listenerGrandParent.calls.count()).toEqual(2);

        updatable.isPending(updatable._updateKey);

        expect(listenerParent.calls.count()).toEqual(3);
        expect(listenerGrandParent.calls.count()).toEqual(3);
      });

      it('is not called once it’s removed', () => {
        updatableParent.listeners.remove(listenerParent);
        updatableGrandParent.listeners.remove(listenerGrandParent);

        updatable.isSuccess(updatable._updateKey);

        expect(listenerParent.calls.count()).toEqual(0);
        expect(listenerGrandParent.calls.count()).toEqual(0);

        updatable.isFailure(updatable._updateKey);

        expect(listenerParent.calls.count()).toEqual(0);
        expect(listenerGrandParent.calls.count()).toEqual(0);

        updatable.isPending(updatable._updateKey);

        expect(listenerParent.calls.count()).toEqual(0);
        expect(listenerGrandParent.calls.count()).toEqual(0);
      });
    });
  });
});
