module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@fortawesome/free-solid-svg-icons|another-esm-package).*\\.js$',
  ],
  globals: {
    'ts-jest': {
      useBabelrc: false,
    },
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
};
