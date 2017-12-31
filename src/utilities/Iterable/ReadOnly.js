// @flow

type Method<Item, Return> = (item: Item, index: number) => Return;

export default class ReadOnly<Item> {
  _items: Array<Item> = [];

  constructor(items: Array<Item>) {
    this._items = items;
  }

  forEach(method: Method<Item, void>, thisArg?: any): void {
    return this._items.forEach(this._iterableMethod(method), thisArg);
  }

  map<Return>(method: Method<Item, Return>, thisArg?: any): Array<Return> {
    return this._items.map(this._iterableMethod(method), thisArg);
  }

  find(method: Method<Item, boolean>, thisArg?: any): ?Item {
    return this._items.find(this._iterableMethod(method), thisArg);
  }

  every(method: Method<Item, boolean>, thisArg?: any): boolean {
    return this._items.every(this._iterableMethod(method), thisArg);
  }

  some(method: Method<Item, boolean>, thisArg?: any): boolean {
    return this._items.some(this._iterableMethod(method), thisArg);
  }

  includes(item: Item): boolean {
    return this._items.includes(item);
  }

  slice(begin?: number, end?: number): Array<Item> {
    return this._items.slice(begin, end);
  }

  all(): Array<Item> {
    return this.slice();
  }

  _iterableMethod<Return>(method: Method<Item, Return>): Method<Item, Return> {
    return (item: Item, index: number): Return => method(item, index);
  }
}
