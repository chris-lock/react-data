import Disposable from 'Disposable';

describe('Disposable', () => {
  let disposable;

  beforeEach(() => {
    disposable = new Disposable;
  });

  it('it defaults disposed to false', () => {
    expect(disposable.disposed).toBe(false);
  });

  describe('#dispose', () => {
    it('it sets disposed to true', () => {
      expect(disposable.disposed).toBe(false);

      disposable.dispose();
      expect(disposable.disposed).toBe(true);
    });
  });
});
