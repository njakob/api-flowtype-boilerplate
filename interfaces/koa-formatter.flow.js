// @flow

type KoaFormatter$Options = {
  formatter?: (ctx: Koa$Context$Impl, err: any) => any;
};

declare module 'koa-formatter' {
  declare function exports(options?: KoaFormatter$Options): (ctx: Koa$Context$Impl, next: Function) => Promise<*>;
}