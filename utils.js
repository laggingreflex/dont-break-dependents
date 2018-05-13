const Path = require('path');
const { promisify } = require('util');
const { spawn } = require('child_process');
const getRepositoryUrl = require('get-repository-url')

const _ = exports;

_.cwd = (...path) => Path.join(process.cwd(), ...path);

_.spawn = (command, args, options) => new Promise((resolve, reject) => {
  const cp = spawn(command, args, {
    shell: true,
    stdio: 'inherit',
    ...options,
  });

  cp.once('error', reject);
  cp.once('exit', code => code === 0 ? resolve() : reject(new Error(`Process exited with code ${code}`)));
});

_.exec = (command, options) => _.spawn(command.split(' ')[0], command.split(' ').slice(1), options);

_.getUrl = promisify(getRepositoryUrl);
