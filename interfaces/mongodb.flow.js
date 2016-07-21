// @flow

declare class MongoDb$ObjectId {
  toString(): string;
}

declare class MongoDb$MongoClient {
  static connect(uri: string): Promise<MongoDb$Db>
}

declare class MongoDb$Db {
  collection(name: string): MongoDb$Collection;
  dropCollection(name: string): Promise<*>;
  dropDatabase(): Promise<any>;
  renameCollection(fromCollection: string, toCollection: string, options: ?{
    dropTarget?: boolean
  }): Promise<MongoDb$Collection>;
}

declare class MongoDb$Collection {
  aggregate(pipeline: any): MongoDb$AggregationCursor;
  count(query: any): Promise<number>;
  createIndex(field: string): Promise<any>;
  createIndex(spec: any): Promise<any>;
  deleteMany(filer: any): Promise<{
    result: any,
    deletedCount: number
  }>;
  deleteOne(filter: any): Promise<{
    result: any,
    deletedCount: number
  }>;
  distinct(key: string, query: any): Promise<any>;
  drop(): Promise<any>;
  dropIndex(indexName: string): Promise<any>;
  find(query: any): MongoDb$Cursor;
  findOneAndDelete(filter: any): Promise<{
    value: any,
    lastErrorObject: any,
    ok: number
  }>;
  findOneAndReplace(filter: any, replacement: any, options: ?{
    projection?: any,
    sort?: any,
    upsert?: boolean,
    returnOriginal?: boolean
  }): Promise<{
    value: any,
    lastErrorObject: any,
    ok: number
  }>;
  findOneAndUpdate(filter: any, update: any, options: ?{
    projection?: any,
    sort?: any,
    upsert?: boolean,
    returnOriginal?: boolean
  }): Promise<{
    value: any,
    lastErrorObject: any,
    ok: number
  }>;
  insertMany(docs: any[]): Promise<{
    insertedCount: number,
    ops: any[],
    insertedIds: MongoDb$ObjectId[],
    result: any
  }>;
  insertOne(doc: any): Promise<{
    insertedCount: number,
    ops: any[],
    insertedId: MongoDb$ObjectId,
    result: any
  }>;
  updateMany(filter: any, update: any, options: ?{
    upsert?: boolean
  }): Promise<{
    matchedCount: number,
    modifiedCount: number,
    upsertedCount: number,
    upsertedId: MongoDb$ObjectId,
    result: any
  }>;
  updateOne(filter: any, update: any, options: ?{
    upsert?: boolean
  }): Promise<{
    matchedCount: number,
    modifiedCount: number,
    upsertedCount: number,
    upsertedId: MongoDb$ObjectId,
    result: any
  }>;
}

declare class MongoDb$AggregationCursor {
  batchSize(value: number): this;
  clone(): this;
  close(): Promise<any>;
  toArray(): Promise<any[]>;
}

declare class MongoDb$Cursor {
  batchSize(value: number): this;
  clone(): this;
  close(): Promise<any>;
  limit(size: number): this;
  project(value: any): this;
  snapshot(snapshot: any): this;
  toArray(): Promise<any[]>;
}

declare module 'mongodb' {
  declare var exports: {
    ObjectId: Class<MongoDb$ObjectId>,
    MongoClient: Class<MongoDb$MongoClient>
  };
}