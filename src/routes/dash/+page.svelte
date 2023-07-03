<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { weekInMilliseconds } from '../../constants/time';
	import { getUserProjects } from '../../features/projects/queryFunctions';
	import { getUser } from '../../features/users/queryFunctions';
	import type { IProject, ITask } from '../../types/project';
	import type { IUser } from '../../types/user';

	type ProjectsQueryResult = {
		projects: IProject[];
	};

	const projectsQuery = useQuery<ProjectsQueryResult>('userProjects', getUserProjects);
	const projectsList = projectsQuery.data?.projects;
	const user = useQuery('user', getUser);

	const tasksToDoWithinAWeek = projectsList
		.map((project: IProject) => {
			return project.tasks.filter((task) => Number(task.dueDate) < Date.now() + weekInMilliseconds);
		})
		.flat()
		.filter((task: ITask) =>
			task.assignedTo.some((member: IUser) => member._id === user.data?.user._id)
		);

	const mostUrgentTasks = tasksToDoWithinAWeek.sort(
		(a: any, b: any) => Number(a.dueDate) - Number(b.dueDate)
	);
</script>

<main>
	<ul>
		{#each mostUrgentTasks as task}
			<div>
				<a href={`/dash/projects/${task.projectId}/task/${task._id}`}>
					<p>{task.name}</p>
				</a>
			</div>
		{/each}
	</ul>
</main>
