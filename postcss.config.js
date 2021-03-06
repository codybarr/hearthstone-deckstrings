const production = !process.env.ROLLUP_WATCH
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
	plugins: [
		require('postcss-import')(),
		require('postcss-nested'),
		require('tailwindcss'),
		require('autoprefixer'),
		production &&
			purgecss({
				content: ['./**/*.html', './**/*.svelte'],
				whitelist: ['visible', 'invisible'],
				defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
			})
	]
}
