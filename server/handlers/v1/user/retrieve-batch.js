// @flow

import * as errorHelper from 'helpers/error';
import * as mongodbHelper from 'helpers/mongodb';
import * as promiseHelper from 'helpers/promise';

import { globalReducer } from 'handlers/v1/reducers';
import type { Server } from 'components/server';
import type { UserEntity } from 'entities/user';

///////////////////

function reducer(error: any) {
  switch (true) {
    case errorHelper.withCode(error, errorHelper.CODES.USER_NOT_FOUND):
    case errorHelper.everyWithCode(error, errorHelper.CODES.USER_NOT_FOUND):
      return 404;
  }
}

export function retrieveBatch(server: Server) {
  return errorHelper.reduce([ reducer, globalReducer ], async(ctx: koa$Context$Impl) => {
    if (ctx.params.users == null) {
      throw new Error('missing users parameter');
    }
    const users: UserEntity[] = ctx.params.users.split(',').map((str) => {
      return { userId: new mongodbHelper.ObjectId(str) };
    });
    if (!users.length) {
      throw new Error('no user id provided');
    }
    if (users.length === 1) {
      const user = await server.user.retrieve(users[0]);
      ctx.status = 200;
      ctx.result = {
        'user_id': user.userId,
        'name': user.name,
        'personal_url': user.personalUrl,
        'email': user.email
      };
    } else {
      const inspections = await server.user.retrieveBatch(users);
      ctx.status = 200;
      const errors = new promiseHelper.AggregateError();
      const result = ctx.result = [];
      for (let inspection of inspections) {
        if (inspection.isRejected()) {
          errors.push(inspection.reason());
        } else {
          const user = inspection.value();
          if (user == null) {
            throw new errorHelper.AssertionError();
          }
          result.push({
            'user_id': user.userId,
            'name': user.name,
            'personal_url': user.personalUrl,
            'email': user.email
          });
        }
      }
      throw errors;
    }
  });
}