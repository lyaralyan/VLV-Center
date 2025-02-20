/**
 * This file is only in the project for eslint module resolution config
 * for our custom import path of @hhs so that eslint knows we're aliasing
 *
 */

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.android.js',
      '.android.tsx',
      '.ios.js',
      '.ios.tsx',
    ],
  },
};
