var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var version = require('./package.json').version;


// Запись в программе
var entry =  __dirname + '/src/index.js';

// Выходной файл
var output =  {
  filename: 'page/[name]/index.js',
  chunkFilename: 'chunk/[name].[chunkhash:5].chunk.js',
};

// Генерация ошибок трассировки js исходной карты
var devtool = 'source-map';

// eslint
var eslint =  {
  configFile: __dirname + '/.eslintrc.js',
}

// loader
var loaders = [
    {
      test: /\.(json)$/,
      exclude: /node_modules/,
      loader: 'json',
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel!eslint-loader',
    },
    {
      test: /\.(?:png|jpg|gif)$/,
      loader: 'url?limit=8192', // Менее 8k, встроенный; Больше 8 КБ сделать файл
    },
    {
      test: /\.less/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[hash:base64:4]!postcss!less'),
    }
];

// dev plugin
var devPlugins =  [
  new CopyWebpackPlugin([
    { from: './src/resource/music/music.mp3' },
    { from: './src/resource/css/loader.css' },
  ]),
  // Горячие обновления
  new webpack.HotModuleReplacementPlugin(),
  // Допускать ошибки без прерывания работы программы, требуется только в режиме разработки
  new webpack.NoErrorsPlugin(),
  // Откройте страницу браузера
  new OpenBrowserPlugin({
    url: 'http://127.0.0.1:8090/'
  }),
  // css упаковывать
  new ExtractTextPlugin('css.css', {
    allChunks: true
  }),
]

// production plugin
var productionPlugins = [
  // Определение рабочей среды
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  // копировать
  new CopyWebpackPlugin([
    { from: './src/resource/music/music.mp3' },
    { from: './src/resource/css/loader.css' },
  ]),
  // HTML шаблон
  new HtmlWebpackPlugin({
    template: __dirname + '/server/index.tmpl.html'
  }),
  // JS компресс
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }}
  ),
  // css упаковывать
  new ExtractTextPlugin('css-' + version + '.css', {
    allChunks: true
  }),
];

// dev server
var devServer = {
  contentBase: './server',
  colors: true,
  historyApiFallback: false,
  port: 8090, // значение по умолчанию "8080"
  hot: true, // Горячая замена модуля
  inline: true, // Livereload
  host: '0.0.0.0',
  disableHostCheck: true
};

module.exports = {
  entry: entry,
  devtool: devtool,
  output: output,
  loaders: loaders,
  devPlugins: devPlugins,
  productionPlugins: productionPlugins,
  devServer: devServer,
  postcss: function () {
    return [precss, autoprefixer];
  },
  version: version
};
