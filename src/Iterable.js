// @flow

type Iterable$Method<Item, Return> = (
  currentValue: Item,
  index: number
) => Return;

export default class Iterable<Item> {
  _items: Array<Item> = [];

  constructor(items: Array<Item>) {
    this._items = items;
  }

  foreach(method: Iterable$Method<Item, void>, thisArg?: any): void {
    return this._items.forEach(this._iterableMethod(method), thisArg);
  }

  map<Return>(method: Iterable$Method<Item, Return>, thisArg?: any): Array<Return> {
    return this._items.map(this._iterableMethod(method), thisArg);
  }

  find(method: Iterable$Method<Item, boolean>, thisArg?: any): ?Item {
    return this._items.find(this._iterableMethod(method), thisArg);
  }

  every(method: Iterable$Method<Item, boolean>, thisArg?: any): boolean {
    return this._items.every(this._iterableMethod(method), thisArg);
  }

  some(method: Iterable$Method<Item, boolean>, thisArg?: any): boolean {
    return this._items.some(this._iterableMethod(method), thisArg);
  }

  all(): Array<Item> {
    return this._items.slice(0);
  }

  _iterableMethod<Return>(method: Iterable$Method<Item, Return>): Iterable$Method<Item, Return> {
    return (item: Item, index: number): Return => method(item, index);
  }
}
