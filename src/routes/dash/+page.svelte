<script lang="ts">
	import { weekInMilliseconds } from '@/constants';
	import type { IProject, ITask } from '../../types/project';
	import type { IUser } from '../../types/user';
	import type { PageData } from './$types';

	export let data: PageData;

	const tasksToDoWithinAWeek = data.projects
		? data.projects
				.map((project: IProject) => {
					return project.tasks.filter(
						(task) => Number(task.dueDate) < Date.now() + weekInMilliseconds
					);
				})
				.flat()
				.filter((task: ITask) =>
					task.assignedTo.some((member: IUser) => member._id === data?.user._id)
				)
		: null;

	const mostUrgentTasks = tasksToDoWithinAWeek
		? tasksToDoWithinAWeek.sort((a: any, b: any) => Number(a.dueDate) - Number(b.dueDate))
		: null;

	const { avatar } = data.user;
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
	{#if data.user}
		<section>
			<img src={dataURI} alt="" />
			<form action="">
				<p>{data.user.username}</p>
				<p>{data.user.email}</p>
				<input type="password" bind:value={data.user.password} />
			</form>
		</section>
	{/if}
</main>
