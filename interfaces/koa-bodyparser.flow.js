// @flow

type koaBodyParser$Options = {
  encode?: string;
  enableTypes?: string[]|{[key: string]: string};
  formLimit?: string;
  jsonLimit?: string;
  strict?: boolean;
  detectJSON?: (ctx: koa$Context$Impl) => boolean;
  onerror?: (err: Error, ctx: koa$Context$Impl) => any;
};

declare module 'koa-bodyparser' {
  declare function exports(options?: koaBodyParser$Options): (ctx: koa$Context$Impl, next: Function) => Promise<*>;
}