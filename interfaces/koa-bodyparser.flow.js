// @flow

type KoaBodyParser$Options = {
  encode?: string;
  enableTypes?: string[]|{[key: string]: string};
  formLimit?: string;
  jsonLimit?: string;
  strict?: boolean;
  detectJSON?: (ctx: Koa$Context$Impl) => boolean;
  onerror?: (err: Error, ctx: Koa$Context$Impl) => any;
};

declare module 'koa-bodyparser' {
  declare function exports(options?: KoaBodyParser$Options): (ctx: Koa$Context$Impl, next: Function) => Promise<*>;
}