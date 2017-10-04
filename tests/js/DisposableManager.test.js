import DisposableManager from 'DisposableManager';
import Disposable from 'Disposable';

describe('DisposableManager', () => {
  let disposable1;
  let disposable2;
  let disposableManager;

  beforeEach(() => {
    disposable1 = new Disposable;
    disposable2 = new Disposable;
    disposableManager = new DisposableManager;
  });

  describe('#addDependency', () => {
    it('maintains an array of Disposables', () => {
      expect(disposableManager._dependencies.length).toEqual(0);

      disposableManager.addDependency(disposable1);
      expect(disposableManager._dependencies.length).toEqual(1);
      expect(disposableManager._dependencies[0]).toBe(disposable1);

      disposableManager.addDependency(disposable2);
      expect(disposableManager._dependencies.length).toEqual(2);
      expect(disposableManager._dependencies[1]).toBe(disposable2);
    });
  });

  describe('#removeDependency', () => {
    beforeEach(() => {
      disposableManager.addDependency(disposable1);
      disposableManager.addDependency(disposable2);
    });

    it('removes the provided Disposable', () => {
      expect(disposableManager._dependencies.length).toEqual(2);

      disposableManager.removeDependency(disposable1);
      expect(disposableManager._dependencies.length).toEqual(1);
      expect(disposableManager._dependencies[0]).toBe(disposable2);
    });
  });

  describe('#prune', () => {
    let pruneSpy;
    let validDisposables = [];

    beforeEach(() => {
      pruneSpy = jasmine.createSpy('pruneSpy')
        .and.callFake((disposable) => validDisposables.indexOf(disposable) > -1);

      disposableManager.addDependency(disposable1);
      disposableManager.addDependency(disposable2);

      validDisposables = [
        disposable1,
        disposable2,
      ];
    });

    it('removes any disposed disposables', () => {
      disposable1.dispose();
      expect(disposableManager._dependencies.length).toEqual(2);

      disposableManager.prune(pruneSpy);
      expect(disposableManager._dependencies.length).toEqual(1);
      expect(disposableManager._dependencies[0]).toBe(disposable2);
    });

    it('does not pass disposed disposables to the provided method', () => {
      disposableManager.prune(pruneSpy);
      expect(pruneSpy.calls.count()).toEqual(2);
      expect(pruneSpy.calls.argsFor(0)).toEqual([disposable1]);
      expect(pruneSpy.calls.argsFor(1)).toEqual([disposable2]);

      disposable1.dispose();
      disposableManager.prune(pruneSpy);
      expect(pruneSpy.calls.count()).toEqual(3);
      expect(pruneSpy.calls.argsFor(2)).toEqual([disposable2]);
    });

    it('filters disposables based on the method provided and whether they’re disposed', () => {
      validDisposables = [
        disposable1,
      ];

      disposableManager.prune(pruneSpy);
      expect(disposableManager._dependencies.length).toEqual(1);
      expect(disposableManager._dependencies[0]).toBe(disposable1);

      disposable1.dispose();
      disposableManager.prune(pruneSpy);
      expect(disposableManager._dependencies.length).toEqual(0);
    });
  });
});
