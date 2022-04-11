const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "./", //! para correr npm start en local quitarle el punto, para subirlo al servidor el punto es lo importante.
	},
	mode: "development",
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"@components": path.resolve(__dirname, "src/components/"),
			"@context": path.resolve(__dirname, "src/context/"),
			"@containers": path.resolve(__dirname, "src/containers/"),
			"@hooks": path.resolve(__dirname, "src/hooks/"),
			"@pages": path.resolve(__dirname, "src/pages/"),
			"@routes": path.resolve(__dirname, "src/routes/"),
			"@styles": path.resolve(__dirname, "src/styles/"),
			"@assets": path.resolve(__dirname, "public/assets/"),
			"@icons": path.resolve(__dirname, "public/assets/icons/"),
			"@imgs": path.resolve(__dirname, "public/assets/imgs/"),
			"@logos": path.resolve(__dirname, "public/assets/logos/"),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.(png|jpg|svg|jpeg|web|svg)$/,
				type: "asset/resource",
				generator: {
					filename: "public/[hash][ext]",
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
					},
				],
			},
			{
				test: /\.(css|scss)$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "./index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		compress: true,
		port: 64340,
		historyApiFallback: true,
	},
};
