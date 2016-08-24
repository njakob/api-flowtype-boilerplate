// @flow

import * as promiseHelper from 'helpers/promise';

import Server from 'components/server';

import * as userEntity from 'entities/user';
import type { UserEntity } from 'entities/user';

///////////////////

export default class UserController {
  server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const createdAt = new Date();
    const data = {
      [userEntity.MONGO_FIELD_CREATED_AT]: createdAt,
      [userEntity.MONGO_FIELD_EMAIL]: user.email,
      [userEntity.MONGO_FIELD_PERSONAL_URL]: user.personalUrl,
      [userEntity.MONGO_FIELD_NAME]: user.name
    };
    const result = await this.server.db.collection(userEntity.MONGO_COLLECTION).insertOne(data);
    if (result.insertedCount !== 1) {
      throw new Error('unable to insert user');
    }
    return {
      ...user,
      createdAt,
      userId: result.insertedId
    };
  }

  async retrieve(user: UserEntity): Promise<UserEntity> {
    const inspections = await this.retrieveBatch([ user ]);
    const inspection = inspections[0];
    if (inspection.isRejected()) {
      throw inspection.reason();
    } else {
      const resultUser: ?UserEntity = inspection.value();
      if (resultUser == null) {
        throw new Error('missing user');
      }
      return resultUser;
    }
  }

  async retrieveBatch(users: UserEntity[]): Promise<promiseHelper.PromiseInspection<UserEntity>[]> {
    const usersIds = users.map((user) => user.userId);
    const result: any[] = await this.server.db.collection(userEntity.MONGO_COLLECTION).find({
      [userEntity.MONGO_FIELD_ID]: { $in: usersIds }
    }).toArray();
    const table: Map<string, any> = new Map(result.map((data) => [ String(data[userEntity.MONGO_FIELD_ID]), data ]));
    const inspections: promiseHelper.PromiseInspection<UserEntity>[] = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const data: any = table.get(String(user.userId));
      if (!data) {
        inspections[i] = promiseHelper.PromiseInspection.reject(new Error('missing user'));
      } else {
        inspections[i] = promiseHelper.PromiseInspection.fulfill({
          ...user,
          createdAt: data[userEntity.MONGO_FIELD_CREATED_AT],
          email: data[userEntity.MONGO_FIELD_EMAIL],
          personalUrl: data[userEntity.MONGO_FIELD_PERSONAL_URL],
          name: data[userEntity.MONGO_FIELD_NAME]
        });
      }
    }
    return inspections;
  }

  async retrieveAll(): Promise<UserEntity[]> {
    const result: any[] = await this.server.db.collection(userEntity.MONGO_COLLECTION).find({}).toArray();
    const users: UserEntity[] = [];
    for (let i = 0; i < result.length; i++) {
      const data = result[i];
      users.push({
        userId: data[userEntity.MONGO_FIELD_ID],
        createdAt: data[userEntity.MONGO_FIELD_CREATED_AT],
        email: data[userEntity.MONGO_FIELD_EMAIL],
        personalUrl: data[userEntity.MONGO_FIELD_PERSONAL_URL],
        name: data[userEntity.MONGO_FIELD_NAME]
      });
    }
    return users;
  }

}