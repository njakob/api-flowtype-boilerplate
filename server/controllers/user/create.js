// @flow

import * as errorHelper from 'helpers/error';

import type { Server } from 'components/server';

import * as userEntity from 'entities/user';
import type { UserEntity } from 'entities/user';

///////////////////

export function create(server: Server) {
  return async(user: UserEntity): Promise<UserEntity> => {
    const createdAt = new Date();
    const document = {
      [userEntity.MONGO_FIELD_CREATED_AT]: createdAt,
      [userEntity.MONGO_FIELD_EMAIL]: user.email,
      [userEntity.MONGO_FIELD_PERSONAL_URL]: user.personalUrl,
      [userEntity.MONGO_FIELD_NAME]: user.name
    };
    const result = await server.db.collection(userEntity.MONGO_COLLECTION).insertOne(document);
    if (result.insertedCount !== 1) {
      throw new errorHelper.MongoInsertionFailedError({
        meta: { collection: userEntity.MONGO_COLLECTION, document }
      });
    }
    return {
      ...user,
      createdAt,
      userId: result.insertedId
    };
  };
}