// @flow

import * as bugsy from 'bugsy';

///////////////////

export const LEVELS = bugsy.LEVELS_SYSLOG;

export const CODES = {
  SYSTEM: 'system',
  OPERATIONAL: 'operational',
  ASSERTION: 'assertion',
  USER_NOT_FOUND: 'user_not_found',
  MONGO_INSERTION_FAILED: 'mongo_insertion_failed',
  ROUTE_NOT_MATCHED: 'route_not_matched'
};

export const everyWithCode = bugsy.everyWithCode;
export const withCode = bugsy.withCode;
export const reduce = bugsy.reduce;

export const SystemError = bugsy.create(
  'SystemError', 'Unexpected system event occurred', { level: LEVELS.CRITICAL, code: CODES.SYSTEM }
);
export const OperationalError = bugsy.create(
  'OperationalError', 'Expected operational error occurred', { level: LEVELS.ERROR, code: CODES.OPERATIONAL }
);
export const AssertionError = bugsy.create(
  'AssertionError', 'Unexpected state occurred', { level: LEVELS.CRITICAL, code: CODES.ASSERTION }
);
export const UserNotFound = bugsy.create(
  'UserNotFound', 'Unable to find the user', { inherits: OperationalError, code: CODES.USER_NOT_FOUND }
);
export const MongoInsertionFailedError = bugsy.create(
  'MongoInsertionFailedError', 'Insertion into mongo collection failed', { inherits: SystemError, code: CODES.MONGO_INSERTION_FAILED }
);
export const RouteNotMatchedError = bugsy.create(
  'RouteNotMatchedError', 'No route matched your request', { inherits: OperationalError, code: CODES.ROUTE_NOT_MATCHED }
);