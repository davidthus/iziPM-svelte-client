<script>
	import { useQuery } from '@sveltestack/svelte-query';
	import { getUserProjects } from '../../features/projects/queryFunctions';

	const projectsQuery = useQuery('userProjects', getUserProjects);
	const projectsList = projectsQuery.data.projects;
</script>

<main>
	<ul />
</main>
