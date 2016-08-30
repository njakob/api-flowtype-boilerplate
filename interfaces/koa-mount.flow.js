// @flow

declare module 'koa-mount' {
  declare function exports(path: string, koa: Koa$Koa): (ctx: koa$Context$Impl, next: Function) => Promise<*>;
}