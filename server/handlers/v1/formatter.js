// @flow

import type { BaseError } from 'bugsy';

///////////////////

function errorFormatter(error: BaseError<*>) {
  return {
    'code': error.code,
    'message': error.message,
    'meta': error.meta
  }
}

export function createFormatter() {
  return function(ctx: koa$Context$Impl, errors: BaseError<*>[]) {
    ctx.body = {};
    if (errors == null) {
      ctx.body['ok'] = 1;
    } else {
      ctx.body['ok'] = 0;
      ctx.body['errors'] = (errors: BaseError<*>[]).map((error: BaseError<*>) => errorFormatter(error));
    }
    ctx.body['status'] = ctx.status;
    ctx.body['result'] = ctx.result;
  }
}