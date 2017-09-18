- initial fetch for insights
- keyboard events
- only exports
-- Record, { Association, Collection, Iterable }
-- Service, { WriteKey }

```es6
class Foo {
  _run(key) {
    Collection.update(key)
      .get()
      .onSuccess()
      .onFailure();
  }
}

class Foo {
  _run(key) {
    Collection.update(key)
      .success()
      .failure();
  }
}

class Bar {
  _run(key) {
    Collection.update(key)
      .and(
        Collection.update(key),
        Collection.update(key)
      )
      .get()
      .onSuccess()
      .onFailure();
  }
}
SubscriptionService.pause()

class SubscriptionService {
  pause(payload) {
    new SubscriptionPause(payload)
  }
}

export default new SubscriptionService

class ClassA
extends Record {
  static associations: typeof Associations = Associations
    .oneToOne({
      local: ClassA,
      localKey: 'b',
      foreign: ClassB,
      foreignKey: 'a',
    })
    .oneToMany({
      local: ClassA,
      localKey: 'c',
      foreign: ClassC,
      foreignKey: 'a',
    })
    .manyToMany({
      local: ClassA,
      localKey: 'd',
      foreign: ClassD,
      foreignKey: 'a',
    });
}
```
