circular reference
many to many
insights pending api calls
initial fetch for insights

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
```
