const path = require("path");
const GasPlugin = require("gas-webpack-plugin");
const Es3ifyPlugin = require("es3ify-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  context: __dirname,
  entry: {
    main: path.resolve(__dirname, "src", "main.ts"),
  },
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [new GasPlugin(), new Es3ifyPlugin()],
};
