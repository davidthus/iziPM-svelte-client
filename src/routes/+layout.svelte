<script>
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';

	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import { sendLogout } from '@/features/auth/queryFunctions';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import { superForm } from 'sveltekit-superforms/client';
	import '../app.postcss';

	const isSidebarOpen = writable(true);

	const toggleSidebar = () => {
		isSidebarOpen.update((prev) => !prev);
	};

	$: ({ data } = $page);
	console.log($page);
	// Client API:
	$: ({ form, errors } = superForm(data.newProjectForm));
</script>

{#if $isSidebarOpen}
	{#if data.user}
		<header>
			<div>
				<form action="/actions?/createProject" method="POST">
					<input type="text" name="projectName" bind:value={$form.projectName} />
					{#if $errors.projectName}
						<p>{$errors.projectName}</p>
					{/if}
					<button type="submit">Create project</button>
				</form>
			</div>
			<div>
				<form action="/actions?/logout" method="post">
					<button title="Logout" type="submit" on:click={sendLogout}>
						<div class="logout icon" />
					</button>
				</form>
				<button title="Close Sidebar" on:click={toggleSidebar}>Close sidebar</button>
			</div>
		</header>
	{/if}
{/if}
<slot />
