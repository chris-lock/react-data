// @flow

class WriteKey {}

const KEY: WriteKey = new WriteKey;

export type {
  WriteKey,
};

export default class Writer {
  _key: WriteKey = KEY;
}
