// @flow

type Listener = () => void;

export default class WriteOnly<Item> {
  _items: Array<Item> = [];
  _owner: any;

  constructor(owner: any) {
    this._owner = owner;
  }

  add(item: Item): void {
    this._items.push(item);
  }

  remove(item: Item): void {
    const index: number = this._items.indexOf(item);

    if (index > -1) {
      this._items.splice(index, 1);
    }
  }

  all(owner: any): Array<Item> {
    return (this._owner === owner)
      ? this._items
      : [];
  }
}
