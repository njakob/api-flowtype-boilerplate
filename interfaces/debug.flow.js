// @flow

declare class debug$Debug {
  (message: string): void;
  enabled: boolean;
}

declare module 'debug' {
  declare var exports: {
    (prefix: string): debug$Debug;
    useColors(): boolean;
  };
}