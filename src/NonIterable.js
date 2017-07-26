// @flow

export default class NonIterable<Item> {
  _items: Array<Item>;

  constructor(items: Array<Item>) {
    this._items = items;
  }

  add(item: Item): void {
    this._items.push(item);
  }

  remove(item: Item): void {
    var index: number = this._items.indexOf(item);

    if (index >= 0) {
      this._items.splice(index, 1);
    }
  }
}
