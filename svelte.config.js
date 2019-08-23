// svelte.config.js
import autoPreprocess from 'svelte-preprocess'
import postcss from 'rollup-plugin-postcss'

module.exports = {
	preprocess: autoPreprocess({
		postcss: true
	}),
	dev: !production,
	// we'll extract any component CSS out into
	// a separate file — better for performance
	css: css => {
		css.write('public/bundle.css')
	}
}
