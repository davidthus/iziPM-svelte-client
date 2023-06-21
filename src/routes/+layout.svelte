<script>
	import { queryClient } from '$lib/query';
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	import { QueryClientProvider } from '@sveltestack/svelte-query';
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
</script>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
