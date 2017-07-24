// @flow

type CollectionType = 'all'|'scope'|'future';
type Items<Item<Data>> = {
  [_:CollectionType]: Array<Item<Data>>,
};

export default class Collection<Item<Data>>
extends Updatable {
  _itemClass: $Class<Item<Data>> = Item;
  _items: Items<Item<Data>> = {

  };

  add(data: Data): void {
    this._addItem('current', query);
  }

  remove(query: $Shape<Data>): void {
  }

  where(query: $Shape<Data>): Collection {
    return new this(this._where(query));
  }

  find(query: $Shape<Data>): Item<Data> {
    return this._where(query)[0] || this._addItem('future', query);
  }

  _addItem(collectionType: CollectionType, data: Data): Item<Data> {
    var item: Item = new this._itemClass(data);

    item.parents.add(this);

    this._items[collectionType].push(item);

    return item;
  }

  _where(query: $Shape<Data>): Array<Item<Data>> {
    return [];
  }
}
