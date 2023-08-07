const m27_the_food_path = '<rootDir>/../../../node_modules/@m27/the-food/dist';

const config = {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageProvider: 'v8',
  coverageDirectory: '../__coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '/@m27\\/the-food\\/(.*)/': `${m27_the_food_path}/$1`,
    '#seedwork/domain(.*)$': `${m27_the_food_path}/@seedwork/$1`,
    '#user/domain(.*)$': `${m27_the_food_path}/user/$1`,
    '#user-favorite/domain(.*)$': `${m27_the_food_path}/user-favorite/$1`,
    '#category/domain(.*)$': `${m27_the_food_path}/category/$1`,
    '#ingredient/domain(.*)$': `${m27_the_food_path}/ingredient/$1`,
    '#comments/domain(.*)$': `${m27_the_food_path}/comments/$1`,
  },
  setupFilesAfterEnv: ['../../@core/src/@seedwork/domain/tests/jest.ts'],
  coverageThreshold: {
    // global: {
    //   statements: 80,
    //   branches: 80,
    //   functions: 80,
    //   lines: 80,
    // },
  },
};
export default config;