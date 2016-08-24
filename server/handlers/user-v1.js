// @flow

'use strict';

import { AggregateError } from 'helpers/promise';
import * as mongodbHelper from 'helpers/mongodb';

import Server from 'components/server';

import UserEntity from 'entities/user';

///////////////////

class UserV1 {
  server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  async createUser(ctx: Koa$Context$Impl, next: Function): Promise<*> {
    const user = new UserEntity({
      name: ctx.request.body['name'],
      email: ctx.request.body['email'],
      personalUrl: ctx.request.body['personal_url']
    });
    if (user.name == null) {
      throw new Error('missing name field');
    }
    if (user.email == null) {
      throw new Error('missing email field');
    }
    await this.server.user.create(user);
    ctx.status = 201;
    ctx.result = {
      'user_id': user.userId,
      'name': user.name,
      'personal_url': user.personalUrl,
      'email': user.email
    };
  }

  async retrieveAllUser(ctx: Koa$Context$Impl, next: Function): Promise<*> {
    const users = await this.server.user.retrieveAll();
    ctx.status = 200;
    ctx.result = users.map((user) => {
      return {
        'user_id': user.userId,
        'name': user.name,
        'personal_url': user.personalUrl,
        'email': user.email
      };
    });
  }

  async retrieveUserBatch(ctx: Koa$Context$Impl, next: Function): Promise<*> {
    if (ctx.params.users == null) {
      throw new Error('missing users parameter');
    }
    const users = ctx.params.users.split(',').map((str) => {
      return new UserEntity({ userId: new mongodbHelper.ObjectId(str) })
    });
    if (!users.length) {
      throw new Error('no user id provided');
    }
    if (users.length === 1) {
      const user = await this.server.user.retrieve(users[0]);
      ctx.status = 200;
      ctx.result = {
        'user_id': user.userId,
        'name': user.name,
        'personal_url': user.personalUrl,
        'email': user.email
      };
    } else {
      const inspections = await this.server.user.retrieveBatch(users);
      ctx.status = 200;
      const errors = new AggregateError();
      const result = ctx.result = [];
      for (let inspection of inspections) {
        if (inspection.isRejected()) {
          errors.push(inspection.reason());
        } else {
          const user = inspection.value();
          if (user == null) {
            throw new Error('missing user');
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
  }

}

///////////////////

export default UserV1;