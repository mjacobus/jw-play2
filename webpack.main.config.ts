import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  // entry: './src/index.ts',
  entry: './src/app.js',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    fallback: {
      "path": require.resolve("path-browserify"),
      // "os": require.resolve("os-browserify/browser"),
      os: false,
    }
  },
};
