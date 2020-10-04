const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const proxyServer = require('./server')

const OUTPUT_PATH = path.resolve(__dirname, 'dist')

const MODE = ((args) => {
  const tokens = args.match(/--mode=(\w+)/i)
  const mode = tokens && tokens.length > 1 ? tokens[1].toLowerCase() : 'production'
  return mode
})(process.argv.join(' '))

const DEV = MODE === 'development'
const PROD = MODE === 'production'

const { PORT, GOOGLE_LOGIN_CLIENT_ID } = process.env

const config = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'redux',
      'react-redux',
      'redux-thunk',
      'redux-logger',
    ],
    index: [
      './src/index.tsx'
    ]
  },
  output: {
    path: OUTPUT_PATH,
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      'route-history': path.resolve(__dirname, 'src/routeHistory.ts'),
      'components': path.resolve(__dirname, 'src/components'),
      'store': path.resolve(__dirname, 'src/store'),
      'reducers': path.resolve(__dirname, 'src/reducers'),
      'selects': path.resolve(__dirname, 'src/selects'),
      'actions': path.resolve(__dirname, 'src/actions'),
      'api': path.resolve(__dirname, 'src/api'),
      'root-constants': path.resolve(__dirname, 'src/rootConstants'),
      'types': path.resolve(__dirname, 'src/types'),
      'services': path.resolve(__dirname, 'src/services'),
      'models': path.resolve(__dirname, 'src/models'),
      'modules': path.resolve(__dirname, 'src/modules'),
      'pages': path.resolve(__dirname, 'src/pages')
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: [{ loader: 'ts-loader' }], exclude: [/node_modules/, /tests/] },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.(png|jpg|jpe?g|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
          },
        }]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
          },
        }]
      }
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ API_PREFIX: '"/api"' }),
    new MiniCssExtractPlugin({ filename: '[name].bundle.css', allChunks: true }),
    new HtmlPlugin({
      template: './src/index.html',
    })
  ],
  devServer: {
    hot: true,
    port: PORT || 8080,
    inline: true,
    disableHostCheck: true,
    contentBase: OUTPUT_PATH,
    historyApiFallback: true,
    before: proxyServer,
  }
}

if (DEV) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
