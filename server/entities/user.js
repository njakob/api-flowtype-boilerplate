// @flow

'use strict';

import * as mongodbHelper from 'helpers/mongodb';

///////////////////

class UserEntity {
  userId: ?mongodbHelper.ObjectId;
  createdAt: ?Date;
  name: ?string;
  email: ?string;
  personalUrl: ?string;

  constructor (options?: {
    userId?: mongodbHelper.ObjectId,
    name?: string,
    email?: string,
    personalUrl?: string
  }): void {
    if (options) {
      this.userId = options.userId;
      this.name = options.name;
      this.email = options.email;
      this.personalUrl = options.personalUrl;
    }
  }
}

///////////////////

export default UserEntity;