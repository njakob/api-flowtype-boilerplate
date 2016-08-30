// @flow

import type { Server } from 'components/server';

import * as userEntity from 'entities/user';
import type { UserEntity } from 'entities/user';

///////////////////

export function retrieveAll(server: Server) {
  return async(): Promise<UserEntity[]> => {
    const result: any[] = await server.db.collection(userEntity.MONGO_COLLECTION).find({}).toArray();
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
  };
}