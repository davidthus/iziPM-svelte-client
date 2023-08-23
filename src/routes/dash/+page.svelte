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
	const projectsList = $projectsQuery.data?.projects;
	const user = useQuery('user', getUser);

	const tasksToDoWithinAWeek = projectsList
		? projectsList
				.map((project: IProject) => {
					return project.tasks.filter(
						(task) => Number(task.dueDate) < Date.now() + weekInMilliseconds
					);
				})
				.flat()
				.filter((task: ITask) =>
					task.assignedTo.some((member: IUser) => member._id === $user.data?.user._id)
				)
		: null;

	const mostUrgentTasks = tasksToDoWithinAWeek
		? tasksToDoWithinAWeek.sort((a: any, b: any) => Number(a.dueDate) - Number(b.dueDate))
		: null;

	const { avatar } = $user.data.user;
	// Convert the binary data to a base64-encoded data URI
	const dataURI =
		'data:' +
		avatar.contentType +
		';base64,' +
		btoa(String.fromCharCode(...new Uint8Array(avatar.data)));
</script>

<main>
	<ul>
		{#if mostUrgentTasks}
			{#each mostUrgentTasks as task}
				<div>
					<a href={`/dash/projects/${task.projectId}/task/${task._id}`}>
						<p>{task.name}</p>
					</a>
				</div>
			{/each}
		{/if}
	</ul>
	{#if $user.data}
		<section>
			<img src={dataURI} alt="User profile picture" />
			<form action="">
				<p>{$user?.data.user.username}</p>
				<p>{$user?.data.user.email}</p>
				<input type="password" bind:value={$user?.data.user.password} />
			</form>
		</section>
	{/if}
</main>
