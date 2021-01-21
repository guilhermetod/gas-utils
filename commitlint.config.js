const types = [
  'Build',
  'CI',
  'Docs',
  'Feat',
  'Fix',
  'Perf',
  'Refactor',
  'Revert',
  'Style',
  'Test',
];

module.exports = {
  extends: [
    '@commitlint/config-angular',
  ],
  rules: {
    'type-case': [2, 'always', 'sentence-case'],
    'type-enum': [2, 'always', types],
  },
};
