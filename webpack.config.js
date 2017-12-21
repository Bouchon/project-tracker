var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = options => {
    return {
        entry: __dirname + '/src/index.js',
        output: {
            publicPath: '/public/',
            filename: 'bundle.js',
        },
        devtool: 'source-map',
        devServer: { 
            historyApiFallback: {
                index: '/public/'
            } 
        },
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
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'react-svg-loader',
                            options: {
                                jsx: true // true outputs JSX tags
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                }
            ],
        },
        plugins: [new HtmlWebpackPlugin({
            title: 'Project Tracker',
            template: __dirname + '/src/index-template.html'
        })]
    }
}