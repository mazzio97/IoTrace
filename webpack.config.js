module.exports = {
	entry: {
		main: './src/main.js',
		webgl_worker: './src/simulation/webgl_worker.js'
	},
	mode: 'development',
	output: {
	  path: `${__dirname}/dist`,
	  filename: '[name].bundle.js',
	}
  };