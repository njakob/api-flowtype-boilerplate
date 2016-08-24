// @flow

'use strict';

import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBodyParser from 'koa-bodyparser';
import koaFormatter from 'koa-formatter';
import koaMount from 'koa-mount';
import dotenv from 'dotenv';

import * as mongodbHelper from 'helpers/mongodb';

import UserV1 from 'handlers/user-v1';

import UserController from 'controllers/user';

///////////////////

class Server {
  koa: Koa;
  db: MongoDb$Db;

  user: UserController;

  mongoUrl: string;
  port: number;

  constructor () {
    dotenv.config();
    this.mongoUrl = this._loadEnvironment('MONGO_URL');
    this.port = parseInt(this._loadEnvironment('PORT'));
    this.koa = new Koa();
    this.user = new UserController(this);
  }

  _loadEnvironment(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error('missing environment');
    }
    return value;
  }

  async exec(): Promise<*> {
    await this._createMongoClient();
    this._createApi();
    this.koa.listen(3000);
  }

  async _createMongoClient(): Promise<*> {
    this.db = await mongodbHelper.Client.connect(this.mongoUrl);
  }

  _createApi(): void {
    const userV1 = new UserV1(this);
    const router = new KoaRouter();
    router.get('/users', userV1.retrieveAllUser.bind(userV1));
    router.post('/users', userV1.createUser.bind(userV1));
    router.get('/users/:users', userV1.retrieveUserBatch.bind(userV1));
    const koa = new Koa();
    koa.use(koaBodyParser());
    koa.use(koaFormatter());
    koa.use(router.routes());
    koa.use(router.allowedMethods());
    koa.use(async(ctx: Koa$Context$Impl): Promise<*> => {
      ctx.throw(400, 'Unmatched route');
    });
    this.koa.use(koaMount('/api/v1', koa));
  }

}

///////////////////

export default Server;