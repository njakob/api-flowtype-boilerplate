// @flow

declare module 'koa-mount' {
  declare function exports(path: string, koa: Koa$Koa): (ctx: Koa$Context$Impl, next: Function) => Promise<*>;
}