<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { getUserProjects } from '../../features/projects/queryFunctions';
	import type {IProject} from "../../types/project";

	type ProjectsQueryResult = {
        projects: IProject[]; 
    };

	const projectsQuery = useQuery<ProjectsQueryResult>('userProjects', getUserProjects);
	const projectsList = projectsQuery.data?.projects;
</script>

<main>
	<ul />
</main>
