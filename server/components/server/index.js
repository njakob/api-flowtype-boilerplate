// @flow

import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBodyParser from 'koa-bodyparser';
import koaFormatter from 'koa-formatter';
import koaMount from 'koa-mount';
import dotenv from 'dotenv';

import * as mongodbHelper from 'helpers/mongodb';

import * as v1Handlers from 'handlers/v1';

import * as userControllers from 'controllers/user';

///////////////////

export class Server {
  koa: Koa;
  db: MongoDb$Db;

  user: {
    create: *;
    retrieve: *;
    retrieveAll: *;
    retrieveBatch: *;
  };

  mongoUrl: string;
  port: number;

  constructor () {
    dotenv.config();
    this.mongoUrl = this._loadEnvironment('MONGO_URL');
    this.port = parseInt(this._loadEnvironment('PORT'));
    this.koa = new Koa();
    this.user = {
      create: userControllers.create(this),
      retrieve: userControllers.retrieve(this),
      retrieveAll: userControllers.retrieveAll(this),
      retrieveBatch: userControllers.retrieveBatch(this)
    };
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
    const router = new KoaRouter();
    router.get('/users', v1Handlers.user.retrieveAll(this));
    router.post('/users', v1Handlers.user.create(this));
    router.get('/users/:users', v1Handlers.user.retrieveBatch(this));
    const koa = new Koa();
    koa.use(koaBodyParser());
    koa.use(koaFormatter({ formatter: v1Handlers.createFormatter() }));
    koa.use(router.routes());
    koa.use(router.allowedMethods());
    koa.use(v1Handlers.system.fallback(this));
    this.koa.use(koaMount('/api/v1', koa));
  }
}