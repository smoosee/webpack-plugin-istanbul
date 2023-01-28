import { createInstrumenter } from "istanbul-lib-instrument";
import {
  createTestExclude,
  instrumenterOptions,
  IstanbulPluginOptions,
  sanitizeSourceMap,
} from "./utils";
import { Compiler, Compilation, sources } from "webpack";

export class WebpackPluginIstanbul {
  constructor(private options: IstanbulPluginOptions = {}) {}

  apply(compiler: Compiler) {
    const name = this.constructor.name;
    compiler.hooks.compilation.tap(name, (compilation) => {
      const stage = Compilation.PROCESS_ASSETS_STAGE_ADDITIONS;
      const instrumenter = createInstrumenter(instrumenterOptions);
      const testExclude = createTestExclude(this.options);

      compilation.hooks.processAssets.tap({ name, stage }, (assets) => {
        Object.entries(assets).forEach(([fileName, cachedSource]) => {
          try {
            const shouldInstrument = testExclude.shouldInstrument(fileName);
            if (shouldInstrument) {
              const { source, map } = cachedSource.sourceAndMap();
              const sourceMap = sanitizeSourceMap(map);
              const instrumented = instrumenter.instrumentSync(
                source as string,
                fileName,
                sourceMap
              );
              compilation.updateAsset(
                fileName,
                new sources.RawSource(instrumented)
              );
            }
          } catch (e: any) {
            console.error("Error instrumenting", fileName, e.message);
          }
        });
      });
    });
  }
}
