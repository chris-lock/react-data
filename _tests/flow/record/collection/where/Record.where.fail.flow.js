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
  // @flow.fix - `where` props parameter is wrong type
  Fail.where((props: '__FAIL__', state: {}): $Shape<Fail$Schema> => ({}));

  // @flow.fix - `where` state parameter is wrong type
  Fail.where((props: {}, state: '__FAIL__'): $Shape<Fail$Schema> => ({}));

  // @flow.fix - `where` return is wrong type
  Fail.where((props: {}, state: {}): string => '__FAIL__');

// @flow.describe --------------------------------------------------------------
  // @flow.fix - `where` props parameter is wrong type
  Fail.where((props: '__FAIL__', state: {}, schema: Fail$Schema): boolean => true);

  // @flow.fix - `where` state parameter is wrong type
  Fail.where((props: {}, state: '__FAIL__', schema: Fail$Schema): boolean => true);

  // @flow.fix - `where` schema parameter is wrong type
  Fail.where((props: {}, state: {}, schema: '__FAIL__'): boolean => true);

  // @flow.fix - `where` return is wrong type
  Fail.where((props: {}, state: {}, schema: Fail$Schema): string => '__FAIL__');
