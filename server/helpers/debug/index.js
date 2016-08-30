// @flow

import debug from 'debug';
import type { Debugger } from 'debug';
import util from 'util';

///////////////////

const serverHandler: Debugger = debug('iconome.server');
const resourceHandler: Debugger = debug('iconome.resource');
const blobHandler: Debugger = debug('iconome.blob');

function write(d: Debugger, fn: () => any[]): void {
  if (d.enabled) {
    let message = '';
    const values = fn();
    const length = values.length;
    for (let i = 0; i < length; i++) {
      if (i === 0) {
        message += values[i];
      } else {
        message += ' ' + util.inspect(values[i], {
            depth: null,
            colors: debug.useColors()
          });
      }
    }
  }
}

export function blob(fn: () => any[]): void {
  write(blobHandler, fn);
}

export function server(fn: () => any[]): void {
  write(serverHandler, fn);
}

export function resource(fn: () => any[]): void {
  write(resourceHandler, fn);
}