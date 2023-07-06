<script lang="ts">
	import { writable } from 'svelte/store';
	import DashFooter from '../../components/DashFooter.svelte';
	import DashHeader from '../../components/DashHeader.svelte';
	import Sidebar from '../../components/Sidebar.svelte';

	const isSidebarOpen = writable<boolean>(true);

	function toggleSidebar() {
		isSidebarOpen.update((prev) => !prev);
	}

	export let data;
</script>

<DashHeader />
{#if $isSidebarOpen}
	<Sidebar {data} {toggleSidebar} />
{:else}
	<button on:click={toggleSidebar}>Open Sidebar</button>
{/if}

<div>
	<slot />
</div>
<DashFooter />
