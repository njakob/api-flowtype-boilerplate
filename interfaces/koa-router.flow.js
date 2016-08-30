// @flow

type koaRouter$Options = {
  prefix?: string
};

declare class koaRouter$Router {
  constructor(options?: koaRouter$Options): void;
  all(name: string, route: string, handler: (ctx: koa$Context$Impl, next: Function) => ?Promise<*>): this;
  all(route: string, handler: (ctx: koa$Context$Impl, next: Function) => ?Promise<*>): this;
  delete(name: string, route: string, handler: (ctx: koa$Context$Impl, next: Function) => ?Promise<*>): this;
  delete(route: string, handler: (ctx: koa$Context$Impl, next: Function) => ?Promise<*>): this;
  get(name: string, route: string, handler: (ctx: koa$Context$Impl, next: Function) => ?Promise<*>): this;
  get(route: string, handler: (ctx: koa$Context$Impl, next: Function) => ?Promise<*>): this;
  patch(name: string, route: string, handler: (ctx: koa$Context$Impl, next: Function) => ?Promise<*>): this;
  patch(route: string, handler: (ctx: koa$Context$Impl, next: Function) => ?Promise<*>): this;
  post(name: string, route: string, handler: (ctx: koa$Context$Impl, next: Function) => ?Promise<*>): this;
  post(route: string, handler: (ctx: koa$Context$Impl, next: Function) => ?Promise<*>): this;
  prefix(prefix: string): this;
  put(name: string, route: string, handler: (ctx: koa$Context$Impl, next: Function) => ?Promise<*>): this;
  put(route: string, handler: (ctx: koa$Context, next: Function) => ?Promise<*>): this;
  routes(): Function;
  use(...middlewares: ((ctx: koa$Context$Impl, next: Function) => ?Promise<*>)[]): this;
  use(path: string|string[], ...middlewares: ((ctx: koa$Context$Impl, next: Function) => ?Promise<*>)[]): this;
  allowedMethods(options?: {
    throw?: boolean,
    notImplemented?: Function,
    methodNotAllowed?: Function,
  }): Function;
  param(param: string, middleware: Function): this;
  redirect(source: string, destination: string, code?: number): this;
  route(name: string): any|false;
  url(name: string, params?: any): string|Error;
  url(path: string, params: Object): string;
}

declare module 'koa-router' {
  declare var exports: Class<koaRouter$Router>;
}