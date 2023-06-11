<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { onMount } from 'svelte';
	import { getUserProjects } from '../projects/queryFunctions';
	import { getUser } from '../users/queryFunctions';

	onMount(() => {
		useQuery('user', getUser);
		useQuery('userProjects', getUserProjects);
	});
</script>

<slot />
