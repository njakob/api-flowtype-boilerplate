// @flow

import * as errorHelper from 'helpers/error';
import * as promiseHelper from 'helpers/promise';

import type { Server } from 'components/server';

import * as userEntity from 'entities/user';
import type { UserEntity } from 'entities/user';

///////////////////

export function retrieveBatch(server: Server) {
  return async(users: UserEntity[]): Promise<promiseHelper.PromiseInspection<UserEntity>[]> => {
    const usersIds = users.map((user) => user.userId);
    const result: any[] = await server.db.collection(userEntity.MONGO_COLLECTION).find({
      [userEntity.MONGO_FIELD_ID]: { $in: usersIds }
    }).toArray();
    const table: Map<string, any> = new Map(result.map((data) => [ String(data[userEntity.MONGO_FIELD_ID]), data ]));
    const inspections: promiseHelper.PromiseInspection<UserEntity>[] = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const userIdStr = String(user.userId);
      const data: any = table.get(userIdStr);
      if (!data) {
        inspections[i] = promiseHelper.PromiseInspection.reject(new errorHelper.UserNotFound({
          meta: { id: userIdStr }
        }));
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
  };
}