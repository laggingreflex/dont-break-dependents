const Path = require('path');
const fs = require('fs-extra');
const _ = require('./utils');

const cwdModule = require(_.cwd('package.json')).name;

module.exports = async (dependents = [], config = {}) => {

  const workDir = (...path) => Path.join(config.dir, ...path);

  await _.exec('npm link');
  await fs.ensureDir(workDir());

  dependents.push(...config._);

  const errors = [];

  const actions = dependents.map(dependent => async () => {
    try {
      const cwd = workDir(dependent);
      if (!await fs.exists(cwd) || config.fresh) {
        await fs.emptyDir(cwd);
        const url = await _.getUrl(dependent);
        await _.exec(`git clone --depth=1 ${url} ${cwd}`);
        await _.exec(`npm install`, { cwd });
        await _.exec(`npm link ${cwdModule}`, { cwd });
      }
      await _.exec(`npm test`, { cwd });
    } catch (error) {
      if (config.bail) {
        throw error;
      } else {
        console.error(error.stack);
        errors.push({ error, dependent });
      }
    }
  });

  if (config.parallel) {
    await Promise.all(actions.map(a => a()));
  } else {
    for (const action of actions) {
      await action();
    }
  }

  if (errors.length) {
    for (const { dependent, error } of errors) {
      console.error('\n', dependent, ':\n', error.stack, '\n');
    }
    throw new Error(`${errors.length} of ${dependents.length} dependents failed`);
  }
};
