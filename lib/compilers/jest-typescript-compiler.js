const throwError = require('../throw-error')

module.exports = function compileTypescript (scriptContent, vueJestConfig, filePath, jestConfig, transformOptions, lang) {
  const psuedoFilePath = `${filePath}.${lang}`;
  /** we try to get the transformer from jest config */
  const transformerConfig = jestConfig.transform.find((transConfig) => {
    const regex = new RegExp(transConfig[0]);
    return regex.test(psuedoFilePath);
  });
  if (!transformerConfig) { throwError('No transformer found for typescript compiling'); }

  const transformer = require(transformerConfig[1]);
  return transformer.process(scriptContent, psuedoFilePath, jestConfig, transformOptions);
}
