// @flow

import Writer from 'Writer';

import type {
  WriteKey,
} from 'Writer';

export type Service$Payload = {};

export default class Service<Payload: Service$Payload>
extends Writer {
  _key: WriteKey;

  constructor(payload: Payload) {
    super();

    this._run(this._key, payload);
  }

  _run(key: WriteKey, payload: Payload): void {}
}
