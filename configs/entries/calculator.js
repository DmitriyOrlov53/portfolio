const path = require('path');
module.exports = {
    context: path.resolve(__dirname, '../../dev/portfolio/calculator/'),
    entry: './calculator.js',
    output: {
        filename: './script.js',
        path: path.resolve(__dirname, '../../build/portfolio/calculator')
    },
}