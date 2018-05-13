const Path = require('path');
const yargs = require('yargs');
const _ = require('./utils');

module.exports = yargs.options({
  dir: {
    alias: 'd',
    describe: 'Directory to clone/install dependent modules in',
    type: 'string',
    default: _.cwd('.dont-break-dependents'),
  },
  fresh: {
    alias: 'f',
    describe: 'Fetch, clone, latest repo and install npm modules for each dependents',
    type: 'boolean',
    default: false,
  },
  parallel: {
    alias: 'p',
    describe: 'Process each dependent in parallel',
    type: 'boolean',
    default: false,
  },
  bail: {
    alias: 'b',
    describe: 'Bail after first dependent tests fail',
    type: 'boolean',
    default: false,
  },
}).argv;
