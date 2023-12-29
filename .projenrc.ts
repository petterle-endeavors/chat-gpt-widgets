import { typescript } from 'projen';

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'typescript-template',
  projenrcTs: true,
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: [
    'projen',
    '@types/chrome',
  ],
  // packageName: undefined,  /* The "name" in package.json. */
  tsconfig: {
    compilerOptions: {
      lib: ['ES2019', 'dom'],
    },
  },
});
project.setScript('build', 'tsc && yarn postbuild');
project.setScript('postbuild', 'cp src/manifest.json lib/ && cp src/rules.json lib/');

project.synth();