import jestConfig from '../jest.config';

export default {
  ...jestConfig,
  displayName: {
    name: 'nestjs-e2e',
    color: 'yellow',
  },
  rootDir: './',
  testRegex: '.*\\.e2e-spec\\.ts$',
  maxWorkers: 1,
  setupFiles: ['<rootDir>/setup-test.ts'],
  moduleNameMapper: {
    '/@m27\\/the-food\\/(.*)/':
      '<rootDir>../../../../node_modules/@m27/the-food/dist/$1',
    '#seedwork/(.*)$':
      '<rootDir>/../../../../node_modules/@m27/the-food/dist/@seedwork/$1',
    '#user/(.*)$':
      '<rootDir>/../../../../node_modules/@m27/the-food/dist/user/$1',
    // '#user-favorite/(.*)$':
    //   '<rootDir>/../../../../node_modules/@m27/the-food/dist/user-favorite/$1',
    // '#category/(.*)$':
    //   '<rootDir>/../../../../node_modules/@m27/the-food/dist/category/$1',
    // '#ingredient/(.*)$':
    //   '<rootDir>/../../../../node_modules/@m27/the-food/dist/ingredient/$1',
    // '#comments/(.*)$':
    //   '<rootDir>/../../../../node_modules/@m27/the-food/dist/comments/$1',
  },
};
