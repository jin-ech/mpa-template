const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const lessModifyVars = require('../src/style/lessVariables');

const env = process.env.NODE_ENV;
const isDev = env === 'development';
const outputName = isDev ? 'dist' : process.env.NODE_ENV;
const publicPath = process.env.PUBLIC_PATH || '/';

// 打包模块
const modules = (function getModules() {
    const modulePath = path.resolve(__dirname, '../src/module');
    const items = fs.readdirSync(modulePath);
    return items.reduce((res, filename) => [...res, filename], []);
})();

// 打包入口
const entry = (function entry() {
    return modules.reduce((res, filename) => {
        res[filename] = path.resolve(__dirname, `../src/module/${filename}/main.js`);
        return res;
    }, {});
})();

// htmlwebpackplugin配置
const getHtmlWebPackPlugins = () => {
    return modules.map(filename => new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: `${filename}.html`,
        chunks: [filename],
        inject: false
    }));
};

module.exports = {
    // mode: 'production',
    cache: {
        type: 'filesystem'
    },
    entry,
    output: {
        path: path.resolve(__dirname, `../dist/${outputName}`),
        filename: "static/js/[name].js",
        chunkFilename: 'static/js/[name].bundle.js',
        publicPath: isDev ? '/' : publicPath,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        extensions: [".js", ".jsx", '.ts', '.tsx']
    },
    module: {
        rules: [{
            test: /\.(js|ts|)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        },
        {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-typescript'],
                    plugins: [
                        '@babel/plugin-transform-runtime'
                    ]
                }
            }
        },
        {
            test: /\.css$/,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: {
                            mode: 'icss',
                        },
                    },
                }
            ]
        },
        {
            test: /\.less$/,
            exclude: [/\.module\.less$/],
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            javascriptEnabled: true,
                            modifyVars: lessModifyVars
                        }
                    }
                },
                {
                    loader: 'style-resources-loader',
                    options: {
                        patterns: path.resolve(__dirname, '../src/style/themes.less')
                    }
                }
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: {
                loader: 'url-loader'
            }
        }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../public/static'),
                to: path.resolve(__dirname, `../dist/${outputName}/static`)
            }]
        }),
        ...getHtmlWebPackPlugins(),
        new DotenvWebpack({
            path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`)
        }),
        new webpack.ProgressPlugin({
            activeModules: true,
            entries: true,
            modules: false,
            modulesCount: 5000,
            profile: false,
            dependencies: false,
            dependenciesCount: 10000,
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, '../public'),
        },
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:5504'
            }
        ],
        hot: true,
        port: 8000
    }
}