import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			'@/*': './src/*',
			components: './src/components',
			api: './src/app/api.ts',
			'auth/*': './src/features/auth/*',
			'projects/*': './src/features/projects/*',
			'users/*': './src/features/users/*',
			constants: './src/constants/index.ts',
			hooks: './src/hooks',
			lib: './src/lib',
			types: './src/types',
			util: './src/util'
		}
	}
};

export default config;
