const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: {
    main: [path.join(__dirname, "./src/scss/index.scss"), path.join(__dirname, "./src/ts/index.tsx")]
  },
  output: {
    path: path.join(__dirname, "./dist/resources/js"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".scss", ".sass", ".css"]
  },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [
                    { loader: "file-loader" },
                    { options: { outputPath: "img" } }
                ]
            },
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                use: [
                    { loader: "file-loader" },
                    { options: { outputPath: "fonts" } }
                ]
            },
            {
                test: /\.(s[ca]ss)$/,
                use: ["style-loader", "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                        {}
                                    ]
                                ]
                            },
                            sourceMap: true
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    }
};
