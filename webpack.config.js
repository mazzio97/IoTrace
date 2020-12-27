const webpack = require('webpack')

module.exports = {
	resolve: {
		fallback: {
		  	crypto: require.resolve('crypto-browserify'),
			stream: require.resolve('stream-browserify'),
			buffer: require.resolve('buffer'),
			assert: require.resolve("assert"),
			util: require.resolve("util"),
			path: require.resolve("path-browserify"),
			zlib: require.resolve("browserify-zlib"),
			https: require.resolve("https-browserify"),
			http: require.resolve("stream-http"),
			url: require.resolve("url"),
			fs: false
		},
	},
	entry: {
		main: './src/main.js',
		webgl_worker: './src/simulation/webgl_worker.js',
		geosolver: './src/geosolver/geosolver.js',
	},
	mode: 'development',
	output: {
	  path: `${__dirname}/dist`,
	  filename: '[name].bundle.js',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: ['eslint-loader'],
		}],
	},
	plugins: [
		new webpack.ProvidePlugin({
		  process: 'process/browser',
		  Buffer: ['buffer', 'Buffer'],
		}),
	]
};