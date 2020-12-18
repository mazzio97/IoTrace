module.exports = {
	entry: {
		main: './src/main.js',
		worker: './src/iota/worker.js'
	},
	mode: 'development',
	output: {
	  path: `${__dirname}/dist`,
	  filename: '[name].bundle.js',
	}
  };