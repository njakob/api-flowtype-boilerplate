// @flow

type koa$Request$charset = string;
type koa$Request$fresh = boolean;
type koa$Request$header = Object;
type koa$Request$host = string;
type koa$Request$hostname = string;
type koa$Request$href = string;
type koa$Request$idempotent = boolean;
type koa$Request$ip = string;
type koa$Request$ips = string[];
type koa$Request$length = ?number;
type koa$Request$method = any;
type koa$Request$origin = string;
type koa$Request$originalUrl = string;
type koa$Request$path = string;
type koa$Request$protocol = string;
type koa$Request$query = Object;
type koa$Request$querystring = string;
type koa$Request$search = string;
type koa$Request$socket = any;
type koa$Request$stale = boolean;
type koa$Request$subdomains = string[];
type koa$Request$type = string;
type koa$Request$url = string;

declare class koa$Request extends http$ClientRequest {
  accepts(...types: string[]): string;
  acceptsCharsets(...charsets: string[]): string;
  acceptsEncodings(...types: string[]): string;
  acceptsLanguages(...charsets: string[]): string;
  body: Object;
  charset: koa$Request$charset;
  fresh: koa$Request$fresh;
  get(field: string): any;
  header: koa$Request$header;
  headers: koa$Request$header;
  host: koa$Request$host;
  hostname: koa$Request$hostname;
  href: koa$Request$href;
  idempotent: koa$Request$idempotent;
  ip: koa$Request$ip;
  ips: koa$Request$ips;
  is(...types: string[]): boolean;
  length: koa$Request$length;
  method: koa$Request$method;
  origin: koa$Request$origin;
  originalUrl: koa$Request$originalUrl;
  path: koa$Request$path;
  protocol: koa$Request$protocol;
  query: koa$Request$query;
  querystring: koa$Request$querystring;
  search: koa$Request$search;
  secure: boolean;
  socket: koa$Request$socket;
  stale: koa$Request$stale;
  subdomains: koa$Request$subdomains;
  type: koa$Request$type;
  url: koa$Request$url;
}

declare class koa$Response extends http$IncomingMessage {
  append(field: string, value: string): void;
  attachment(filename?: string): void;
  body?: ?string|Buffer|stream$Duplex|Object;
  etag: ?any;
  get(field: string): string;
  header: Object;
  headers: Object;
  headerSent: boolean;
  is(...types: string[]): boolean;
  lastModified: ?Date;
  length: ?number;
  message?: ?string;
  redirect(url: string, alt?: string): void;
  remove(field: string): void;
  set(field: string, value: string): void;
  set(fields: { [key: string]: string }): void;
  socket: any;
  status?: ?number;
  type: ?string;
  vary(field: string): void;
}

declare class koa$Cookies {
  get(name: string, options?: {
    signed: boolean,
  }): string;
  set(name: string, value: string, options?: {
    signed?: boolean,
    expires?: moment$Moment,
    path?: string,
    domain?: string,
    secure?: boolean,
    httpOnly?: boolean,
  }): this;
}

declare class koa$Context {
  app: Koa$Koa;
  assert(value: any, msgOrStatus?: number|string, properties?: Object): void;
  assert(value: any, msgOrStatus?: number|string, statusOrMsg?: number|string, properties?: Object): void;
  cookies: koa$Cookies;
  req: http$ClientRequest;
  request: koa$Request;
  res: http$IncomingMessage;
  respond: boolean;
  response: koa$Response;
  state: Object;
  throw(msg: string, properties?: Object): void;
  throw(msg: string, statusCode: number, properties?: Object): void;
  throw(statusCode: number, msg: string, properties?: Object): void;
  throw(statusCode: number, properties?: Object): void;

  accepts(...types: string[]): string;
  acceptsCharsets(...charsets: string[]): string;
  acceptsEncodings(...types: string[]): string;
  acceptsLanguages(...charsets: string[]): string;
  fresh: koa$Request$fresh;
  get(field: string): any;
  header: koa$Request$header;
  headers: koa$Request$header;
  host: koa$Request$host;
  hostname: koa$Request$hostname;
  href: koa$Request$href;
  ip: koa$Request$ip;
  ips: koa$Request$ips;
  is(...types: string[]): boolean;
  method: koa$Request$method;
  origin: koa$Request$origin;
  originalUrl: koa$Request$originalUrl;
  path: koa$Request$path;
  protocol: koa$Request$protocol;
  query: koa$Request$query;
  querystring: koa$Request$querystring;
  secure: boolean;
  socket: koa$Request$socket;
  stale: koa$Request$stale;
  subdomains: koa$Request$subdomains;
  url: koa$Request$url;

  append(field: string, value: string): void;
  attachment(filename?: string): void;
  body?: ?(string|Buffer|stream$Duplex|Object|Array<*>|number|boolean);
  etag: ?any;
  lastModified: ?Date;
  redirect(url: string, alt?: string): void;
  remove(field: string): void;
  set(field: string, value: string): void;
  set(fields: { [key: string]: string }): void;
  status?: ?number;
}

declare class Koa$Koa extends events$EventEmitter {
  constructor(): void;
  listen(port: number | string): void;
  callback(): Function;
  keys: string[] | Object;
  use(contextFn: (ctx: koa$Context$Impl, next: Function) => ?Promise<*>): this;
}

declare module 'koa' {
  declare var exports: Class<Koa$Koa>;
}

// It is currently impossible to simply add declarations
// into types; therefore, we extends the context to provide
// the other declarations. The downside is we have to use
// this type rather than koa$Context
// see https://github.com/facebook/flow/issues/396
declare class koa$Context$Impl extends koa$Context {
  body: any;
  result: any;
  params: {
    users?: string
  };
}