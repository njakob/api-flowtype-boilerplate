// @flow

import * as errorHelper from 'helpers/error';

import { globalReducer } from 'handlers/v1/reducers';
import type { Server } from 'components/server';
import type { UserEntity } from 'entities/user';

///////////////////

function reducer(error: any) {
  switch (true) {

  }
}

export function create(server: Server) {
  return errorHelper.reduce([ reducer, globalReducer ], async(ctx: koa$Context$Impl) => {
    let user: UserEntity = {
      name: ctx.request.body['name'],
      email: ctx.request.body['email'],
      personalUrl: ctx.request.body['personal_url']
    };
    if (user.name == null) {
      throw new Error('missing name field');
    }
    if (user.email == null) {
      throw new Error('missing email field');
    }
    user = await server.user.create(user);
    ctx.status = 201;
    ctx.result = {
      'user_id': user.userId,
      'name': user.name,
      'personal_url': user.personalUrl,
      'email': user.email
    };
  });
}