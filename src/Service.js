// @flow

import Writer from 'Writer';

import type {
  WriteKey,
} from 'Writer';

export type ServicePayload = {};

export default class Service<Payload: ServicePayload>
extends Writer {
  _payload: Payload;

  constructor(payload: Payload) {
    super();

    this._payload = payload;
  }

  _withKey(key: WriteKey): void {
    this._run(key, this._payload);
  }

  _run(key: WriteKey, payload: Payload) {}
}
