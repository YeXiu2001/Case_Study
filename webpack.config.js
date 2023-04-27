const path = require('path')

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}