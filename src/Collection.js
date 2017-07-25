// @flow

type CollectionType = 'current'|'future';
type Items<Item<Data>> = {
  [_:CollectionType]: Array<Item<Data>>,
};

export default class Collection<Item<Data>>
extends Updatable {
  _itemClass: $Class<Item<Data>> = Item;
  _items: Items<Item<Data>> = {
    current: [],
    future: [],
  };

  constructor() {

  }

  add(data: Data): void {
    this._addItem('current', data);
  }

  remove(query: $Shape<Data>): boolean {
    var item: ?Item<Data> = this._find(query);

    return (
      !!item
      || this._remove
    );
    if (item) {
      let index: number = this._items.current
    }
  }

  where(query: $Shape<Data>): Collection<Item<Data>> {
    return new this(this._where(query));
  }

  find(query: $Shape<Data>): Item<Data> {
    return this._find(query) || this._addItem('future', query);
  }

  _addAsParent(item: Item<Data>): Item<Data> {
    item.parents.add(this);

    return item;
  }

  _addItem(collectionType: CollectionType, data: Data): Item<Data> {
    var item: Item = new this._itemClass(data);

    this._items[collectionType].push(
      this._addAsParent(item)
    );

    return item;
  }

  _where(query: $Shape<Data>): Array<Item<Data>> {
    return [];
  }

  _find(query: $Shape<Data>): ?Item<Data> {
    this._where(query)[0];
  }

  _remove(item: Item<Data>): boolean {

  }
}

// Collection
// all -> scope
