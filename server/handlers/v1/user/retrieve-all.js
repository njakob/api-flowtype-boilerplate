// @flow

import * as errorHelper from 'helpers/error';

import { globalReducer } from 'handlers/v1/reducers';
import type { Server } from 'components/server';

///////////////////

function reducer(error: any) {
  switch (true) {
    case errorHelper.everyWithCode(error, errorHelper.CODES.USER_NOT_FOUND):
      return 404;
  }
}

export function retrieveAll(server: Server) {
  return errorHelper.reduce([ reducer, globalReducer ], async(ctx: koa$Context$Impl) => {
    const users = await server.user.retrieveAll();
    ctx.status = 200;
    ctx.result = users.map((user) => {
      return {
        'user_id': user.userId,
        'name': user.name,
        'personal_url': user.personalUrl,
        'email': user.email
      };
    });
  });
}