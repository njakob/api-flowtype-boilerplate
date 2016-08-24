// @flow

import { PromiseInspection } from 'helpers/promise';

import Server from 'components/server';

import UserEntity from 'entities/user';

///////////////////

class UserController {
  server: Server;

  constructor (server: Server) {
    this.server = server;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    user.createdAt = new Date();
    const data = {
      'created_at': user.createdAt,
      'email': user.email,
      'personal_url': user.personalUrl,
      'name': user.name
    };
    const result = await this.server.db.collection('users').insertOne(data);
    if (result.insertedCount !== 1) {
      throw new Error('unable to insert user');
    }
    user.userId = result.insertedId;
    return user;
  }

  async retrieve(user: UserEntity): Promise<UserEntity> {
    const inspections = await this.retrieveBatch([ user ]);
    if (inspections[0].isRejected()) {
      throw inspections[0].reason();
    }
    return user;
  }

  async retrieveBatch(users: UserEntity[]): Promise<PromiseInspection<UserEntity>[]> {
    const usersIds = users.map((user) => user.userId);
    const result = await this.server.db.collection('users').find({
      '_id': { $in: usersIds }
    }).toArray();
    const table: Map<string, any> = new Map(result.map((data) => [ String(data['_id']), data ]));
    const inspections: PromiseInspection<UserEntity>[] = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const data = table.get(String(user.userId));
      if (!data) {
        inspections[i] = PromiseInspection.reject(new Error('missing user'));
      } else {
        user.createdAt = data['created_at'];
        user.email = data['email'];
        user.personalUrl = data['personal_url'];
        user.name = data['name'];
        inspections[i] = PromiseInspection.fulfill(user);
      }
    }
    return inspections;
  }

  async retrieveAll(): Promise<UserEntity[]> {
    const result = await this.server.db.collection('users').find({}).toArray();
    const users: UserEntity[] = [];
    for (let i = 0; i < result.length; i++) {
      const user = new UserEntity();
      const data = result[i];
      user.userId = data['_id'];
      user.createdAt = data['created_at'];
      user.email = data['email'];
      user.personalUrl = data['personal_url'];
      user.name = data['name'];
      users.push(user);
    }
    return users;
  }

}

///////////////////

export default UserController;