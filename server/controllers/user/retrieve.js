// @flow

import * as errorHelper from 'helpers/error';

import type { Server } from 'components/server';

import type { UserEntity } from 'entities/user';

///////////////////

export function retrieve(server: Server) {
  return async(user: UserEntity): Promise<UserEntity> => {
    const inspections = await server.user.retrieveBatch([ user ]);
    const inspection = inspections[0];
    if (inspection.isRejected()) {
      throw inspection.reason();
    } else {
      const resultUser: ?UserEntity = inspection.value();
      if (resultUser == null) {
        throw new errorHelper.AssertionError();
      }
      return resultUser;
    }
  };
}