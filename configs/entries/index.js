const path = require('path');
module.exports = {
    context: path.resolve(__dirname, '../../dev'),
    entry: './index.js',
    output: {
        filename: './script.js',
        path: path.resolve(__dirname, '../../build')
    },
}