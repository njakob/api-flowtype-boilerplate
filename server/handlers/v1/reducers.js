// @flow

import * as errorHelper from 'helpers/error';

///////////////////

export function globalReducer(error: any) {
  switch (true) {
    case errorHelper.withCode(error, errorHelper.CODES.ROUTE_NOT_MATCHED):
      return 400;
  }
}