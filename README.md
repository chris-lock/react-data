Todo

- only exports
    - Record, { Association, Collection }
    - Service, { WriteKey }
- disposables don’t work with sibling records (1:1) switching since one record would have to update all of it’s dependencies
    - Switch to listeners?
- Version manager needs to be tested with dispose or listener removal

Needs

- data only returns iterables or frozen objects
- initial fetch for insights
- keyboard events
- Modals?
- Concurrency?
- Reusing other services?

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
