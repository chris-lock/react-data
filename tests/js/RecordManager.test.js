import RecordManager from 'RecordManager';
import Record from 'Record';
import WriteKey from 'support/WriteKey';
import Data from 'support/Data';

describe('RecordManager', () => {
  class RecordTest
  extends Record {}

  const seedRecord = {
    foo: true,
  };
  const seedRecords = [
    seedRecord,
  ];

  describe('new', () => {
    let recordManager;

    beforeEach(() => {
      recordManager = new RecordManager(WriteKey, RecordTest);
    });

    describe('with no bootstrapped data', () => {
      it('it generates no records', () => {
        expect(recordManager.records).toEqual([]);
      });
    });

    describe('with bootstrapped data', () => {
      beforeAll(() => {
        Data.seed('RecordTest', seedRecords);
        Data.seed('__FAIL__$RecordTest', seedRecords);
      });

      it('it generates all records bootstrapped under it’s class name', () => {
        expect(recordManager.records.length).toEqual(1);
        expect(recordManager.records[0] instanceof RecordTest).toEqual(true);
        expect(recordManager.records[0]._data).toEqual(seedRecord);
      });
    });
  });
});
