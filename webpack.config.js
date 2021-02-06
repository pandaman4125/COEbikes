const path = require("path");
const {VueLoaderPlugin} = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = () => ({
	cache: false,
	mode: process.env.NODE_ENV ? "production" : "development",
	entry: {
		index: path.resolve(__dirname, "./src/index.ts")
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
		publicPath: "/"
	},
	target: "web",
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: "vue-loader"
			},
			{
				test: /\.ts$/,
				loader: "ts-loader",
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader"
					}
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					},
					{
						loader: "sass-loader"
					}
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]"
						}
					}
				]
			}
		]
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		},
		extensions: [
			".ts",
			".js",
			".vue",
			".json"
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			inject: true,
			chunks: ["index"],
			filename: "index.html"
		}),
		// new webpack.DefinePlugin({
		// 	"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
		// }),
		new Dotenv()
	],
	devServer: {
		hot: true,
		port: 8888,
		contentBase: path.resolve(__dirname, "./dist"),
		historyApiFallback: {
			index: "index.html"
		}
	}
});
