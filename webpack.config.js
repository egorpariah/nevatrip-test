import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import globImporter from 'node-sass-glob-importer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  entry: {
    index: './src/index.js',
    tickets: './src/tickets.js',
    route: './src/route.js',
    block: './src/block.js',
    table: './src/table.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: false,
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: false,
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: ['mozjpeg', ['pngquant', { quality: [0.4, 0.6] }]],
          },
        },
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
      {
        test: /\.hbs$/,
        use: {
          loader: 'handlebars-loader',
          options: {
            helperDirs: [path.join(__dirname, './src/js/helpers')],
            inlineRequires: '/images/',
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: { sassOptions: { importer: globImporter() } },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset',
        generator: {
          filename: 'assets/icons/[hash][ext][query]',
        },
        use: 'svgo-loader',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.hbs',
      filename: 'index.html',
      favicon: './src/icons/favicon.ico',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './src/tickets.hbs',
      filename: 'tickets.html',
      favicon: './src/icons/favicon.ico',
      chunks: ['tickets'],
    }),
    new HtmlWebpackPlugin({
      template: './src/route.hbs',
      filename: 'route.html',
      favicon: './src/icons/favicon.ico',
      chunks: ['route'],
    }),
    new HtmlWebpackPlugin({
      template: './src/block.hbs',
      filename: 'block.html',
      favicon: './src/icons/favicon.ico',
      chunks: ['block'],
    }),
    new HtmlWebpackPlugin({
      template: './src/table.hbs',
      filename: 'table.html',
      favicon: './src/icons/favicon.ico',
      chunks: ['table'],
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
};

export default (env, argv) => {
  if (argv.mode === 'development') {
    config.output.filename = '[name].js';
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    config.output.filename = '[name].[chunkhash].js';
    config.output.clean = true;
    config.optimization.minimize = true;
  }

  return config;
};
