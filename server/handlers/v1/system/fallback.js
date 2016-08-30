// @flow

import * as errorHelper from 'helpers/error';

import { globalReducer } from 'handlers/v1/reducers';
import type { Server } from 'components/server';

///////////////////

export function fallback(server: Server) {
  return errorHelper.reduce([ globalReducer ], async(ctx: koa$Context$Impl) => {
    throw new errorHelper.RouteNotMatchedError({ meta: { path: ctx.url } });
  });
}