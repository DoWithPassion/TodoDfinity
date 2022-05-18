const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizer = require('css-minimizer-webpack-plugin')

// Backend motoko related and dfx related
const dfxJson = require("./dfx.json");
const TerserPlugin = require("terser-webpack-plugin");

const webpack = require("webpack");


// List of all aliases for canisters. This creates the module alias for
// the `import ... from "@dfinity/ic/canisters/xyz"` where xyz is the name of a
// canister.
const aliases = Object.entries(dfxJson.canisters).reduce(
    (acc, [name, _value]) => {
        // Get the network name, or `local` by default.
        const networkName = process.env["DFX_NETWORK"] || "local";
        const outputRoot = path.join(
            __dirname,
            ".dfx",
            networkName,
            "canisters",
            name
        );

        return {
            ...acc,
            ["dfx-generated/" + name]: path.join(outputRoot, name + ".js"),
        };
    },
    {}
);



/**
 * Generate a webpack configuration for a canister.
 */
function generateWebpackConfigForCanister(name, info) {
    if (typeof info.frontend !== "object") {
        return;
    }

    return {
        mode: "production",
        entry: {
            // The frontend.entrypoint points to the HTML file for this build, so we need
            // to replace the extension to `.js`.
            index: path.join(__dirname, info.frontend.entrypoint).replace(/\.html$/, ".js"),
        },
        devtool: "source-map",
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin(),new CssMinimizer(), '...'],
            
        },
        resolve: {
            alias: aliases,
            extensions: [".js", ".ts", ".jsx", ".tsx"],
            fallback: {
                "assert": require.resolve("assert/"),
                "buffer": require.resolve("buffer/"),
                "events": require.resolve("events/"),
                "stream": require.resolve("stream-browserify/"),
                "util": require.resolve("util/"),
            },
        },
        module: {
            rules: [
                // Svg loader
                // It means, whenever svg is found in js file, 
                // since the js cannot load svg directly we are using some ones code/module
                {
                    test: /\.svg$/,
                    loader: "svg-inline-loader"
                },
                // Styles/css Loader
                // Here we mentioned multiple loaders and also the loaders are loaded from right to left
                // Css loader allows us to import all the css properties into out js file.
                // Style loader allows us to take the css properties further to inject them to into the stylesheet of index file
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"]
                },
                {
                    // Find the group of js
                    test: /\.(js)$/,
                    // ignore transpiling JavaScript from node_modules as it should be that state
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                '@babel/preset-react',
                                "@babel/preset-env"
                            ],
                            plugins:[
                                '@babel/transform-runtime'
                            ]
                        }
                    }
                }
            ]
        },
        output: {
            filename: "[name].js",
            path: path.join(__dirname, "dist", name),
        },

        // Depending in the language or framework you are using for
        // front-end development, add module loaders to the default
        // webpack configuration. For example, if you are using React
        // modules and CSS as described in the "Adding a stylesheet"
        // tutorial, uncomment the following lines:
        // module: {
        //  rules: [
        //    { test: /\.(ts|tsx|jsx)$/, loader: "ts-loader" },
        //    { test: /\.css$/, use: ['style-loader','css-loader'] }
        //  ]
        // },
        plugins: [
            // new HtmlWebpackPlugin({
            //   template: path.join(__dirname, info.frontend.entrypoint),
            //   filename: 'index.html',
            //   chunks: ['index'],
            // }),
            new HtmlWebpackPlugin({ template: path.join(__dirname, info.frontend.entrypoint) }),
            new webpack.ProvidePlugin({
                Buffer: [require.resolve('buffer/'), 'Buffer'],
                process: require.resolve('process/browser'),
            }),
        ],
        devServer: {
            proxy: {
                '/api': 'http://localhost:8001'
            }
        }
    };
}

// If you have additional webpack configurations you want to build
//  as part of this configuration, add them to the section below.
module.exports = [
    ...Object.entries(dfxJson.canisters)
        .map(([name, info]) => {
            return generateWebpackConfigForCanister(name, info);
        })
        .filter((x) => !!x),
];

