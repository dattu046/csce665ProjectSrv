const path = require('path');

module.exports = {
  entry: './intercept.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};