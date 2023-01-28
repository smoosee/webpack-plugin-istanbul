import TestExclude from "test-exclude";

const DEFAULT_EXTENSION = [
  ".js",
  ".cjs",
  ".mjs",
  ".ts",
  ".tsx",
  ".jsx",
  ".vue",
];

export interface IstanbulPluginOptions {
  include?: string | string[];
  exclude?: string | string[];
  extension?: string | string[];
  cwd?: string;
}

export const instrumenterOptions = {
  coverageGlobalScopeFunc: false,
  coverageGlobalScope: "window",
  coverageVariable: "__coverage__",
  preserveComments: true,
  produceSourceMap: true,
  autoWrap: true,
  esModules: true,
  compact: false,
};

export function createTestExclude(opts: IstanbulPluginOptions): TestExclude {
  const { include, exclude, extension } = opts;
  const cwd = opts.cwd ?? process.cwd();

  // Only instrument when we want to, as we only want instrumentation in test
  // By default the plugin is always on
  return new TestExclude({
    cwd,
    include: include,
    exclude: exclude,
    extension: extension ?? DEFAULT_EXTENSION,
    excludeNodeModules: true,
  });
}

export function sanitizeSourceMap(rawSourceMap) {
  // Delete sourcesContent since it is optional and if it contains process.env.NODE_ENV vite will break when trying to replace it
  const { sourcesContent, ...sourceMap } = rawSourceMap;

  // JSON parse/stringify trick required for istanbul to accept the SourceMap
  return JSON.parse(JSON.stringify(sourceMap));
}
