// @flow
// Copyright (c) Iconome.io

import debug from 'debug';
import util from 'util';

///////////////////

const server: debug$Debug = debug('iconome.server');
const resource: debug$Debug = debug('iconome.resource');
const blob: debug$Debug = debug('iconome.blob');

class DebugFacade {

  static blob(fn: () => any[]): void {
    DebugFacade._debug(blob, fn);
  }

  static server(fn: () => any[]): void {
    DebugFacade._debug(server, fn);
  }

  static resource(fn: () => any[]): void {
    DebugFacade._debug(resource, fn);
  }

  static _debug(d: debug$Debug, fn: () => any[]): void {
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

}



///////////////////

export default DebugFacade;