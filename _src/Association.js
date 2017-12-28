// @flow

import Writer from './Writer';

import type {
  Record$Schema,
  Record$Class,
  Record$Child,
} from './Record';
import Collection from './Collection';
import type {
  WriteKey,
} from 'Writer';

type Data<A> = $PropertyType<A, '_data'>;

type Data$Key<A> = $Keys<Data<A>>;

type HasOne<A, A$Key, B> = (
  Record$Class<{
    [_:A$Key]: Record$Child<Data<B>>,
  }>
  & Class<A>
);

type HasMany<A, A$Key, B> = (
  Record$Class<{
    [_:A$Key]: Collection<Data<B>>,
  }>
  & Class<A>
);

export default class Association<
  Schema: Record$Schema
>
extends Writer {
  oneToOne<
    Local,
    Local$Key: Data$Key<Local>,
    Foreign,
    Foreign$Key: Data$Key<Foreign>,
  >(oneToOne: {
    from: [
      HasOne<Local, Local$Key, Foreign>
        & Record$Class<Schema>,
      Local$Key,
    ],
    to: [
      HasOne<Foreign, Foreign$Key, Local>,
      Foreign$Key,
    ],
  }): Association<Schema> {
    return this;
  }

  oneToMany<
    Local,
    Local$Key: Data$Key<Local>,
    Foreign,
    Foreign$Key: Data$Key<Foreign>,
  >(oneToMany: {
    from: [
      HasMany<Local, Local$Key, Foreign>
        & Record$Class<Schema>,
      Local$Key,
    ],
    to: [
      HasOne<Foreign, Foreign$Key, Local>,
      Foreign$Key,
    ],
  }): Association<Schema> {
    return this;
  }

  manyToOne<
    Local,
    Local$Key: Data$Key<Local>,
    Foreign,
    Foreign$Key: Data$Key<Foreign>,
  >(manyToOne: {
    from: [
      HasOne<Local, Local$Key, Foreign>
        & Record$Class<Schema>,
      Local$Key,
    ],
    to: [
      HasMany<Foreign, Foreign$Key, Local>,
      Foreign$Key,
    ],
  }): Association<Schema> {
    return this;
  }

  manyToMany<
    Local,
    Local$Key: Data$Key<Local>,
    Foreign,
    Foreign$Key: Data$Key<Foreign>,
  >(manyToMany: {
    from: [
      HasMany<Local, Local$Key, Foreign>
        & Record$Class<Schema>,
      Local$Key,
    ],
    to: [
      HasMany<Foreign, Foreign$Key, Local>,
      Foreign$Key,
    ],
  }): Association<Schema> {
    return this;
  }
}
