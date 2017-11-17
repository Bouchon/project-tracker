var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = options => {
    return {
        entry: __dirname + '/src/index.js',
        output: {
            path: __dirname + '/public',
            filename: 'bundle.js',
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: { cacheDirectory: true, },
                        },
                    ],
                },
            ],
        },
        plugins: [new HtmlWebpackPlugin({
            title: 'Project Tracker',
            template: __dirname + '/src/index-template.html'
        })]
    }
}