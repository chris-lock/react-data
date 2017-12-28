import VersionManager from 'VersionManager';

describe('VersionManager', () => {
  let versionManagerA;
  let versionManagerASetVersionSpy;

  beforeEach(() => {
    versionManagerA = new VersionManager;
    versionManagerASetVersionSpy = spyOn(versionManagerA, '_setVersion')
        .and.callThrough();
  });

  describe('#version', () => {
    it('is computed when called', () => {
      expect(versionManagerA._version).toBeUndefined();
      expect(versionManagerA.version()).toEqual(1);
      expect(versionManagerA._version).toEqual(1);
      expect(versionManagerASetVersionSpy.calls.count()).toEqual(1);
    });

    it('is memoized', () => {
      expect(versionManagerA.version()).toEqual(1);

      versionManagerA.version();
      expect(versionManagerASetVersionSpy.calls.count()).toEqual(1);
    });
  });

  describe('#clear', () => {
    it('causes the version to be recalculated', () => {
      expect(versionManagerA.version()).toEqual(1);

      versionManagerA.clear();
      expect(versionManagerA.version()).toEqual(2);
    });

    it('does nothing if called multiple times before version is called again', () => {
      versionManagerA.version();
      versionManagerA.clear();
      versionManagerA.clear();

      expect(versionManagerA.version()).toEqual(2);
    });
  });

  describe('with dependencies', () => {
    let versionManagerB;
    let versionManagerBSetVersionSpy;
    let versionManagerC;
    let versionManagerCSetVerionSpy;

    beforeEach(() => {
      versionManagerB = new VersionManager;
      versionManagerA.addDependency(versionManagerB);
      versionManagerBSetVersionSpy = spyOn(versionManagerB, '_setVersion')
        .and.callThrough();

      versionManagerC = new VersionManager;
      versionManagerB.addDependency(versionManagerC);
      versionManagerCSetVerionSpy = spyOn(versionManagerC, '_setVersion')
        .and.callThrough();
    });

    describe('#version', () => {
      it('is computed for all dependencies when called', () => {
        expect(versionManagerA._version).toBeUndefined();
        expect(versionManagerB._version).toBeUndefined();
        expect(versionManagerC._version).toBeUndefined();
        expect(versionManagerA.version()).toEqual(1);

        expect(versionManagerA._version).toEqual(1);
        expect(versionManagerASetVersionSpy.calls.count()).toEqual(1);
        expect(versionManagerB._version).toEqual(1);
        expect(versionManagerBSetVersionSpy.calls.count()).toEqual(1);
        expect(versionManagerC._version).toEqual(1);
        expect(versionManagerCSetVerionSpy.calls.count()).toEqual(1);
      });

      it('is memoized', () => {
        expect(versionManagerA.version()).toEqual(1);

        versionManagerA.version();
        expect(versionManagerASetVersionSpy.calls.count()).toEqual(1);
        expect(versionManagerBSetVersionSpy.calls.count()).toEqual(1);
        expect(versionManagerCSetVerionSpy.calls.count()).toEqual(1);

        versionManagerB.version();
        expect(versionManagerASetVersionSpy.calls.count()).toEqual(1);
        expect(versionManagerBSetVersionSpy.calls.count()).toEqual(1);
        expect(versionManagerCSetVerionSpy.calls.count()).toEqual(1);

        versionManagerC.version();
        expect(versionManagerASetVersionSpy.calls.count()).toEqual(1);
        expect(versionManagerBSetVersionSpy.calls.count()).toEqual(1);
        expect(versionManagerCSetVerionSpy.calls.count()).toEqual(1);
      });
    });

    describe('#clear', () => {
      it('only clears its dependencies', () => {
        expect(versionManagerA.version()).toEqual(1);
        expect(versionManagerB.version()).toEqual(1);
        expect(versionManagerC.version()).toEqual(1);

        versionManagerC.clear();
        expect(versionManagerA.version()).toEqual(1);
        expect(versionManagerB.version()).toEqual(1);
        expect(versionManagerC.version()).toEqual(2);

        versionManagerB.clear();
        expect(versionManagerA.version()).toEqual(1);
        expect(versionManagerB.version()).toEqual(2);
        expect(versionManagerC.version()).toEqual(3);

        versionManagerA.clear();
        expect(versionManagerA.version()).toEqual(2);
        expect(versionManagerB.version()).toEqual(3);
        expect(versionManagerC.version()).toEqual(4);
      });
    });

    describe('with circular dependencies', () => {
      beforeEach(() => {
        versionManagerC.addDependency(versionManagerA);
      });

      describe('#version', () => {
        it('is computed for all dependencies when called', () => {
          expect(versionManagerA._version).toBeUndefined();
          expect(versionManagerB._version).toBeUndefined();
          expect(versionManagerC._version).toBeUndefined();
          expect(versionManagerB.version()).toEqual(1);

          expect(versionManagerA._version).toEqual(1);
          expect(versionManagerASetVersionSpy.calls.count()).toEqual(1);
          expect(versionManagerB._version).toEqual(1);
          expect(versionManagerBSetVersionSpy.calls.count()).toEqual(1);
          expect(versionManagerC._version).toEqual(1);
          expect(versionManagerCSetVerionSpy.calls.count()).toEqual(1);
        });

        it('is memoized', () => {
          expect(versionManagerB.version()).toEqual(1);

          versionManagerA.version();
          expect(versionManagerASetVersionSpy.calls.count()).toEqual(1);
          expect(versionManagerBSetVersionSpy.calls.count()).toEqual(1);
          expect(versionManagerCSetVerionSpy.calls.count()).toEqual(1);

          versionManagerB.version();
          expect(versionManagerASetVersionSpy.calls.count()).toEqual(1);
          expect(versionManagerBSetVersionSpy.calls.count()).toEqual(1);
          expect(versionManagerCSetVerionSpy.calls.count()).toEqual(1);

          versionManagerC.version();
          expect(versionManagerASetVersionSpy.calls.count()).toEqual(1);
          expect(versionManagerBSetVersionSpy.calls.count()).toEqual(1);
          expect(versionManagerCSetVerionSpy.calls.count()).toEqual(1);
        });
      });

      describe('#clear', () => {
        it('clears all versions', () => {
          expect(versionManagerA.version()).toEqual(1);
          expect(versionManagerB.version()).toEqual(1);
          expect(versionManagerC.version()).toEqual(1);

          versionManagerC.clear();
          expect(versionManagerA.version()).toEqual(2);
          expect(versionManagerB.version()).toEqual(2);
          expect(versionManagerC.version()).toEqual(2);

          versionManagerB.clear();
          expect(versionManagerA.version()).toEqual(3);
          expect(versionManagerB.version()).toEqual(3);
          expect(versionManagerC.version()).toEqual(3);

          versionManagerA.clear();
          expect(versionManagerA.version()).toEqual(4);
          expect(versionManagerB.version()).toEqual(4);
          expect(versionManagerC.version()).toEqual(4);
        });
      });
    });
  });
});
