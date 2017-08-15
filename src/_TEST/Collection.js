// @flow

import type Record, {
  RecordSchema,
} from './Record';

export default class Collection<Schema: RecordSchema, Item: Record<Schema>> {
  _itemClass: Class<Item>;

  constructor(itemClass: Class<Item>) {
    this._itemClass = itemClass;
  }
}
