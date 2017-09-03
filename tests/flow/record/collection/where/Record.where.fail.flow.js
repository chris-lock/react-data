// @flow

import Record from 'Record';

type Fail$Schema = {
  fail1: boolean,
  fail2: boolean,
};

class Fail
extends Record<Fail$Schema> {
  _data: Fail$Schema;
}

// @flow.describe --------------------------------------------------------------
  // @flow.test - `where` value is wrong type
  Fail.where({
    fail1: '__FAIL__',
  });

// @flow.describe --------------------------------------------------------------
  // @flow.test - `where` key does not exist
  Fail.where({
    fail1: true,
    fail3: '__FAIL__',
  });

// @flow.describe --------------------------------------------------------------
  // @flow.fix - `where` schema parameter is wrong type
  Fail.where((schema: '__FAIL__'): $Shape<Fail$Schema> => ({}));

  // @flow.fix - `where` props parameter is wrong type
  Fail.where((schema: Fail$Schema, props: '__FAIL__'): $Shape<Fail$Schema> => ({}));

  // @flow.fix - `where` state parameter is wrong type
  Fail.where((schema: Fail$Schema, props: {}, state: '__FAIL__'): $Shape<Fail$Schema> => ({}));

// @flow.describe --------------------------------------------------------------
  // @flow.fix - `where` schema parameter is wrong type
  Fail.where((schema: '__FAIL__'): boolean => true);

  // @flow.fix - `where` props parameter is wrong type
  Fail.where((schema: Fail$Schema, props: '__FAIL__'): boolean => true);

  // @flow.fix - `where` state parameter is wrong type
  Fail.where((schema: Fail$Schema, props: {}, state: '__FAIL__'): boolean => true);

// @flow.describe --------------------------------------------------------------
  // @flow.fix - `where` return type is wrong
  Fail.where((schema: Fail$Schema): string => '__FAIL__');

  // @flow.fix - `where` return type is wrong
  Fail.where((schema: Fail$Schema, props: {}): string => '__FAIL__');

  // @flow.fix - `where` return type is wrong
  Fail.where((schema: Fail$Schema, props: {}, state: {}): string => '__FAIL__');
