window.RECORDS = {};

class Data {
  seed(recordClassName, records) {
    RECORDS[recordClassName] = {
      records,
    };
  }

  reset() {
    RECORDS = {};
  }
}

export default new Data;
