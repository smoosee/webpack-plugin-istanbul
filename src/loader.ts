import { createInstrumenter } from "istanbul-lib-instrument";
import { createTestExclude, instrumenterOptions } from "./utils";

const instrumenter = createInstrumenter(instrumenterOptions);

export async function WebpackLoaderInstanbul(content) {
  const callback = this.async();
  const options = this.getOptions();

  try {
    const testExclude = await createTestExclude(options);
    if (testExclude.shouldInstrument(this.resourcePath)) {
      content = instrumenter.instrumentSync(content, this.resourcePath);
    }

    return callback(null, content);
  } catch (err) {
    console.error("Error loading:", this.resourcePath);
    return callback(err);
  }
}

module.exports = WebpackLoaderInstanbul;
