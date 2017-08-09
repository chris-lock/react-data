// @flow

class Key {}

const KEY: Key = new Key;

export type WriteKey = Key;

export default class Service<Payload: {}> {
  _key: Key = KEY;

  constructor(payload: Payload) {
    this._run(this._key, payload);
  }

  _run(key: Key, payload: Payload) {}
}

// class Foo {
//   _run(key) {
//     Collection.update(key)
//       .get()
//       .onSuccess()
//       .onFailure();
//   }
// }

// class Foo {
//   _run(key) {
//     Collection.update(key)
//       .success()
//       .failure();
//   }
// }

// class Bar {
//   _run(key) {
//     Collection.update(key)
//       .and(
//         Collection.update(key),
//         Collection.update(key)
//       )
//       .get()
//       .onSuccess()
//       .onFailure();
//   }
// }
