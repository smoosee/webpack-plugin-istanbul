<div align="center">

<h1>webpack-plugin-istanbul</h1>
<p>Minimal Webpack5 plugin for instrumenting code coverage using istanbul</p>

[![][img.release]][link.release]
[![][img.license]][link.license]

![][img.node]
![][img.npm]
![][img.downloads]

[![][img.typescript]][link.npm]
[![][img.webpack]][link.npm]

[![][img.health]][link.snyk]

[![][img.banner]][link.npm]

</div>

<h2>Table of Contents</h2>

- [Getting started](#getting-started)
- [How it works](#how-it-works)
- [Configuration](#configuration)
  - [Plugin Example](#plugin-example)
  - [Loader Example](#loader-example)
- [Credit](#credit)

## Getting started

Install the library:

```js
yarn add webpack-plugin-istanbul -D
```

## How it works

You have the option to choose between a plugin and a loader to instrument your code for coverage. The plugin might be a better option if you are using a test runner that does not support loaders. The loader is a better option if you are feeling the plugin is too slow to handle.

The plugin is using **`processAssets`** with the stage of **`PROCESS_ASSETS_STAGE_ADDITIONS`** to read and update code, while the loader reads the code directly through `webpack`'s loading mechanism.

Initially, the plugin/loader will `createInstrumenter` from the `istanbul-lib-instrument` package.

Both the plugin and the loader use the same configuration options and pass them along to the `createTestExclude` method. See the [TestExclude](https://github.com/istanbuljs/test-exclude).

Afterwards, will check if the requested file `shouldInstrument` and if so, it will be passed to `instrumentSync` method to finalize the instrumentation process.

To ensure your code is properly instrumented, you can check the `__coverage__` variable in your browser's console.

## Configuration

For the current time being, the following options are supported:

```ts
include?: string | string[]; // glob strings
exclude?: string | string[]; // glob strings
extension?: string | string[]; // dot file extensiosn (e.g. '.js', '.ts', ...etc)
cwd?: string;   // process.cwd() by default
```

### Plugin Example

```js
const { WebpackPluginIstanbul } = require("webpack-plugin-istanbul");

module.exports = {
  plugins: [
    new WebpackPluginIstanbul({
      include: ["src/**/*.js"],
      exclude: ["src/**/*.spec.js"],
      extension: [".js"],
      cwd: process.cwd(),
    }),
  ],
};
```

### Loader Example

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "webpack-plugin-istanbul/loader",
          options: {
            include: ["src/**/*.js"],
            exclude: ["src/**/*.spec.js"],
            extension: [".js"],
            cwd: process.cwd(),
          },
        },
      },
    ],
  },
};
```

## Credit

This plugin is based on the work of [vite-plugin-istanbul](https://github.com/ifaxity/vite-plugin-istanbul) by [ifaxity](https://github.com/iFaxity). The plugin was originally created to work with Vite, but I wanted to use it with webpack. I decided to create a new plugin instead of forking the original because I wanted to make some changes to the API and the way the plugin works.

[img.release]: https://img.shields.io/github/actions/workflow/status/sheriffMoose/webpack-plugin-istanbul/release.yml?logo=github&label=release
[img.license]: https://img.shields.io/github/license/sheriffMoose/webpack-plugin-istanbul?logo=github
[img.node]: https://img.shields.io/node/v/webpack-plugin-istanbul?logo=node.js&logoColor=white&labelColor=339933&color=grey&label=
[img.npm]: https://img.shields.io/npm/v/webpack-plugin-istanbul?logo=npm&logoColor=white&labelColor=CB3837&color=grey&label=
[img.downloads]: https://img.shields.io/npm/dt/webpack-plugin-istanbul?logo=docusign&logoColor=white&labelColor=purple&color=grey&label=
[img.typescript]: https://img.shields.io/npm/dependency-version/webpack-plugin-istanbul/dev/typescript?logo=typescript&logoColor=white&labelColor=3178C6&color=grey&label=
[img.webpack]: https://img.shields.io/npm/dependency-version/webpack-plugin-istanbul/dev/webpack?logo=webpack&logoColor=white&labelColor=3178C6&color=grey&label=
[img.health]: https://snyk.io/advisor/npm-package/webpack-plugin-istanbul/badge.svg
[img.banner]: https://nodei.co/npm/webpack-plugin-istanbul.png
[link.release]: https://github.com/sheriffMoose/webpack-plugin-istanbul/actions/workflows/release.yml
[link.license]: https://github.com/sheriffMoose/webpack-plugin-istanbul/blob/master/LICENSE
[link.npm]: https://npmjs.org/package/webpack-plugin-istanbul
[link.snyk]: https://snyk.io/advisor/npm-package/webpack-plugin-istanbul
