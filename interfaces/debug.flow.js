// @flow

type debug$Debugger = {
  (message: string): void;
  enabled: boolean;
  log: () => {},
  namespace: string;
}

declare module 'debug' {
  declare export type Debugger = debug$Debugger;

  declare export default (namespace: string) => Debugger;

  declare function disable(): void;
  declare function enable(namespaces: string): void;
  declare function enabled(name: string): boolean;
  declare function humanize(): void;
  declare function useColors(): boolean;
  declare function log(): void;
}