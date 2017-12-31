// @flow

type Listener = () => void;

export default class WriteOnly<Owner: any, Item> {
  _items: Array<Item> = [];
  _owner: Owner;

  constructor(owner: Owner) {
    this._owner = owner;
  }

  add(...items: Array<Item>): void {
    this._items.push(...items);
  }

  remove(...items: Array<Item>): void {
    items.forEach((item: Item): void => {
      const index: number = this._items.indexOf(item);

      if (index > -1) {
        this._items.splice(index, 1);
      }
    });
  }

  all(owner: Owner): Array<Item> {
    return (this._owner === owner)
      ? this._items
      : [];
  }
}
