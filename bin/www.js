'use strict';

const Server = require('../build');

(new Server.default()).exec().catch((error) => {
  console.error(error.stack);
  process.exit(1);
});