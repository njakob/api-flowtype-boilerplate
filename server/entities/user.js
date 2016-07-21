// @flow

'use strict';

import * as mongodb from 'facades/mongodb';

///////////////////

class UserEntity {
  userId: ?mongodb.ObjectId;
  createdAt: ?Date;
  name: ?string;
  email: ?string;
  personalUrl: ?string;

  constructor (options?: {
    userId?: mongodb.ObjectId,
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