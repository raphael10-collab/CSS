const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules\/.+\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.ts$/,
    //include: /src/,
    use: [{ loader: 'ts-loader' }]
  },
  {
    test: /\.tsx?$/,
    //include: /src/,
    exclude: /(node_modules|\.webpack)/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        loader: 'babel-loader',
      }
    ]
  },
  { // https://babeljs.io/setup#installation
    test: /\.jsx?$/,
    exclude: /(node_modules|\.webpack)/,
    //use: {
      //loader: ['babel-loader', 'astroturf/loader'],
      //options: {
        //presets: ['@babel/preset-env']
      //}
    //}
    use: [
          'babel-loader',
        {
          loader: 'astroturf/loader',
          options: { extension: '.module.scss' },
       }
    ],
  },

  {
    test: /\.pcss$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },

  {
    test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
    use: 'url-loader',
  },

  {
    test: /\.css$/i,
    type: 'asset', // https://github.com/webpack-contrib/postcss-loader/issues/580#issuecomment-1130126061
    use: [
      {
        loader: "style-loader"
      },
      {
        loader:  "postcss-loader"
      },
      {
        loader: "css-loader"
      }
    ],
    //generator: {
      //outputPath: '.webpack/assets/css/'
    //},
  },

  {
    test: /\.(oggmp3|wav|mpe?g)$/i,
    type: 'asset',
    use: [
      {
        loader: 'file-loader'
      }
    ],
  },

  {
    test: /\.(oggmp3|wav|mpe?g)$/i,
    loader: 'file-loader',
    options: {
      name: '[path]èname].[ext]'
    }
  }

];
