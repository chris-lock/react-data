// @flow

import Writer from './Writer';

import type {
  Record$Schema,
  Record$Class,
  Record$Child,
} from './Record';
import type {
  WriteKey,
} from 'Writer';

type Foreign$Schema$Key<Foreign> = $Keys<$PropertyType<Foreign, '_data'>>;

type Foreign$One<Schema, Key, Foreign, Foreign$Key> = (
  Class<Foreign>
  & Class<$ElementType<Schema, Key>>
  & Record$Class<{
    [_:Foreign$Key]: Record$Child<Schema>,
  }>
);

export default class Association<
  Schema: Record$Schema
>
extends Writer {
  _recordClass: Record$Class<Schema>;

  constructor(recordClass: Record$Class<Schema>) {
    super();

    this._recordClass = recordClass;
  }

  oneToOne<
    Key: $Keys<Schema>,
    Foreign: $ElementType<Schema, Key>,
    Foreign$Key: Foreign$Schema$Key<Foreign>
  >(oneToOne: {
    from: Key,
    to: [
      Foreign$One<Schema, Key, Foreign, Foreign$Key>,
      Foreign$Key,
    ],
  }): Association<Schema> {
    return this;
  }
}
