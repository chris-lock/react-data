import Writer from 'Writer';
import WriteKey from 'support/WriteKey';

describe('Writer', () => {
  it('has a private WriteKey', () => {
    expect((new Writer)._key instanceof WriteKey.constructor).toBe(true);
  });
});
