module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '^~/(.+)': './src/\\1',
          '^@entities/(.+)': './src/entities/\\1',
          '^@database/(.+)': './src/database/\\1',
        }
      }
    ]
  ],
  ignore: ['**/*.test.ts']
};
