#!/usr/bin/env node

const config = require('./config');

require('.')([], config).catch(e => {
  // console.error(e.message);
  console.error(e.stack);
  process.exit(1);
});
