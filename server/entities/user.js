// @flow

import type { ObjectId } from 'helpers/mongodb';

///////////////////

export const MONGO_COLLECTION = 'users';

export const MONGO_FIELD_ID = '_id';
export const MONGO_FIELD_CREATED_AT = 'created_at';
export const MONGO_FIELD_NAME = 'name';
export const MONGO_FIELD_EMAIL = 'email';
export const MONGO_FIELD_PERSONAL_URL = 'personal_url';

export type UserEntity = {
  userId?: ObjectId;
  createdAt?: Date;
  name?: string;
  email?: string;
  personalUrl?: string;
}