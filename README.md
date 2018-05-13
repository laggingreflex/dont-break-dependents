# dont-break-dependents

Run tests on packages that are dependent on your package.

## Install

```
npm i dont-break-dependents
```

## Usage

```
dont-break-dependents [...options] [...dependents]
```

* **`dependents`** `[string(s)]` NPM module names that depend on your package

* **`options`**

  * **`dir|d`** `[string]` `(default:<current-dir>/.dont-break-dependents)` Directory to clone/install dependent modules in

    NOTE: Default directory is `<current-dir>/.dont-break-dependents`. Add this to your project's `.gitignore`

  * **`fresh|f`** `[boolean]` `(default:false)` Fetch, clone, latest repo and install npm modules for each dependents
  * **`parallel|p`** `[boolean]` `(default:false)` Process each dependent in parallel
  * **`bail|b`** `[boolean]` `(default:false)` Bail after first dependent tests fail

It does the following:

1. Runs `npm link` in current-dir (to link your module)

2. Clones the git repositories of each dependent inside `.dont-break-dependents/<dependent>`

3. Runs `npm install` for each dependent

4. Runs `npm link <your-package>` (to link your module inside the respective dependents)

5. Runs `npm test` for each dependent

## Misc.

Find your most widely used dependents at `https://www.npmjs.com/browse/depended/<your-package>`
