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
  // @flow.test - `first` value is wrong type
  Fail.first({
    fail1: '__FAIL__',
  });

// @flow.describe --------------------------------------------------------------
  // @flow.test - `first` key does not exist
  Fail.first({
    fail1: true,
    fail3: '__FAIL__',
  });

// @flow.describe --------------------------------------------------------------
  // @flow.fix - `first` props parameter is wrong type
  Fail.first((props: '__FAIL__', state: {}): $Shape<Fail$Schema> => ({}));

  // @flow.fix - `first` state parameter is wrong type
  Fail.first((props: {}, state: '__FAIL__'): $Shape<Fail$Schema> => ({}));

  // @flow.fix - `first` return is wrong type
  Fail.first((props: {}, state: {}): string => '__FAIL__');

// @flow.describe --------------------------------------------------------------
  // @flow.fix - `first` props parameter is wrong type
  Fail.first((props: '__FAIL__', state: {}, schema: Fail$Schema): boolean => true);

  // @flow.fix - `first` state parameter is wrong type
  Fail.first((props: {}, state: '__FAIL__', schema: Fail$Schema): boolean => true);

  // @flow.fix - `first` schema parameter is wrong type
  Fail.first((props: {}, state: {}, schema: '__FAIL__'): boolean => true);

  // @flow.fix - `first` return is wrong type
  Fail.first((props: {}, state: {}, schema: Fail$Schema): string => '__FAIL__');
