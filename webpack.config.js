//<ADD PLUGINS>

const path = require('path');
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const CssMqpackerPlugin = require("css-mqpacker-webpack-plugin");


//</ADD PLUGINS>


//<SYSTEM VARS>


const mode = process.env.NODE_ENV;

const devMode = (mode === 'development');
const prodMode = !devMode;

//</SYSTEM VARS>


//<SELF VARS>
const SRC_FOLDER = "src";
const BUILD_FOLDER = "dist";

const PATHS = {
    src: path.resolve(SRC_FOLDER),
    dist: path.resolve(BUILD_FOLDER),
}

const PAGES = fs.readdirSync(SRC_FOLDER).filter(filename => filename.endsWith('.pug'));

//</SELF VARS>


//<RENDERING FUNCTIONS>

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (prodMode) {
        config.minimize = true
        config.minimizer = [
            new CSSMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
            new CssMqpackerPlugin(),
        ]
    } else {
        config.runtimeChunk = 'single' 
    }

    return config
}


const getFilename = (extension) => devMode? `[name].${extension}`: `[name].[contenthash].bundle.${extension}`


const renderPlugins = () => {
    const plugins = [
        ...PAGES.map(page => {
            return new HTMLWebpackPlugin({
                template: `${SRC_FOLDER}/${page}`,
                filename: `./${page.replace(/\.pug/, '.html')}`,
                minify: {
                    collapseWhitespace: prodMode
                },
                chunks: [`${page === 'index.pug' ? 'main' : page.replace(/\.pug/, '')}`],
            });
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/img/empty-photo.png'),
                    to: path.resolve(__dirname, 'dist/assets')
                },
            ]
        }),

        new MiniCssExtractPlugin({
            filename: getFilename('css')
        }),
    ]

    if (prodMode) {
        plugins.push(new BundleAnalyzerPlugin())
    } 

    return plugins
}

const renderEntries = () => {
    const entries = {};

    entries.main = ['@babel/polyfill' ,`./src/js/index.js`];

    PAGES.forEach(page => {
        if (page === 'index.pug') {return};

        const pageName = page.replace(/\.pug/, '');
        entries[`${pageName}`] = ['@babel/polyfill' ,`./src/js/${pageName}.js`];
    })

    return entries;
}

//</RENDERING FUNCTIONS>


//<CONFIG>

module.exports = {
    mode,
    target: devMode ? "web": "browserslist",
    entry: renderEntries(),
    output: {
        filename: `./js/${getFilename('js')}`,
        path: PATHS.dist,
        publicPath: `auto`,
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@js': `${PATHS.src}/js`,
            '@src': PATHS.src,
            '@img': `${PATHS.src}/img`,
            '@assets': `${PATHS.src}/assets`
        }
    },
    optimization: optimization(),
    devtool: devMode? 'source-map' : false,
    devServer: {
        historyApiFallback: true,
        static: PATHS.dist,
        compress: true,
        open: true,
        hot: devMode,
        port: 'auto',
        host: 'local-ip',
        watchFiles: [
            `${PATHS.src}/**/*.html`,
            `${PATHS.src}/**/*.pug`,
            `${PATHS.src}/**/*.htm`,
            `${PATHS.src}/img/**/*.*`,
        ],
    },
    plugins: renderPlugins(),
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "pug-loader"
                    },
                ]
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            
                                        },
                                    ]
                                ]
                            },
                        },
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|ico)$/i,
                type: devMode? 'asset/resource' : 'asset',
            },
            {
                test: /\.(mp4)$/i,
                type: 'asset',
            },
            {
                test: /\.(ttf|woff2?|eot|otf|svg)$/i,
                type: 'asset/inline'
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                    {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                    }
                ]
            }
        ]
    }
}

//</CONFIG>