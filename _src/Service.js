// @flow

import Writer from './Writer';

import type {
  WriteKey,
} from './Writer';

export type ServicePayload = {};

export default class Service<Payload: ServicePayload>
extends Writer {
  _key: WriteKey;

  constructor(payload: Payload) {
    super();

    this._run(this._key, payload);
  }

  _run(key: WriteKey, payload: Payload) {}
}
