/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const filename2 = (ext) =>
  isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`;
const assetPath = (pathString) => (isDev ? '' : pathString);

const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    configObj.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return configObj;
};

const plugins = () => {
  const basePlugins = [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: isDev ? 'index.html' : 'index.[contenthash].html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? './css/style.css' : './css/style.[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/img'),
          to: path.resolve(__dirname, 'app/img/[name].[contenthash][ext]'),
        },
      ],
    }),
  ];

  if (isProd) {
    basePlugins.push(
      new ImageMinimizerPlugin({
        minimizer: [
          {
            implementation: ImageMinimizerPlugin.squooshMinify,
          },
          {
            implementation: ImageMinimizerPlugin.svgoMinify,
            options: {
              encodeOptions: {
                plugins: ['preset-default'],
              },
            },
          },
        ],
        generator: [
          {
            preset: 'webp',
            implementation: ImageMinimizerPlugin.squooshGenerate,
            options: {
              encodeOptions: {
                webp: {
                  quality: 90,
                },
              },
            },
          },
        ],
      })
    );
  }
  return basePlugins;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/main.js',
  output: {
    filename: `./js/${filename('js')}`,
    path: path.resolve(__dirname, 'app'),
    publicPath: '',
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'app'),
    },
    open: true,
    compress: true,
    hot: true,
  },
  optimization: optimization(),
  plugins: plugins(),
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) =>
                `${path.relative(path.dirname(resourcePath), context)}/`,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      {
        test: /\.(?:|gif|png|jpg|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: path.join(`${assetPath('img')}`, `${filename2('[ext]')}`),
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: path.join(`${assetPath('icons')}`, `${filename2('[ext]')}`),
        },
      },
      {
        test: /\.woff2$/,
        type: 'asset/resource',
        generator: {
          filename: path.join(`${assetPath('fonts')}`, `${filename2('[ext]')}`),
        },
      },
      {
        test: /\.ico$/,
        type: 'asset/resource',
        generator: {
          filename: path.join('', `${filename2('[ext]')}`),
        },
      },
    ],
  },
};
