// @flow

declare module 'dotenv' {
  declare var exports: {
    config(options?: {
      path?: string,
      silent?: boolean,
      encoding?: string
    }): boolean;
  };
}