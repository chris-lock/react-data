Todo

- only exports
    - Record, { Association, Collection }
    - Service, { WriteKey }
- when switch the record at a oneTonOne, you need to update the queries of both the old and new record.
  - A <-> B
- disposables don’t work with sibling records (1:1) switching since one record would have to update all of it’s dependencies
    - Switch to listeners?
- Version manager needs to be tested with dispose or listener removal

Structure
- Node
    - Data
    - Listeners (really version)
- Collection
- VersionTree
- Needs

- loading state on a form that creates elements (need both record state and service state)
- data only returns iterables or frozen objects
- initial fetch for insights
- keyboard events
- Modals?
- Concurrency?
- Cancelling requests? (Autocomplete)
- Reusing other services?
- Sorting recipes and searching recipes

```es6
if (this.state.cache < this.cache.version) {
  this.setState((prevState: State, props: Props): $Shape<State> => ({
    cache: this.cache.read(),
  }));
}

this.setState((prevState: State, props: Props): $Shape<State> => {
  return (prevState.cache === this.cache.version)
    ? {
        cache: this.cache.read(),
      }
    : {};
});
```

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
