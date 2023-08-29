<script>
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';

	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import Sidebar from 'components/Sidebar.svelte';
	import '../app.postcss';

	const isSidebarOpen = writable(true);

	const toggleSidebar = () => {
		isSidebarOpen.update((prev) => !prev);
	};

	$: ({ data } = $page);
	console.log($page);
</script>

{#if $isSidebarOpen}
	<Sidebar {toggleSidebar} {data} />
{/if}
<slot />
