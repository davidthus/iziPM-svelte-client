<script lang="ts">
	import { writable } from 'svelte/store';
	import type { LayoutData } from './$types';

	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import { sendLogout } from '@/features/auth/queryFunctions';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import { superForm } from 'sveltekit-superforms/client';
	import '../app.postcss';

	export let data: LayoutData;

	const { form, errors } = superForm(data.newProjectForm);
	const isSidebarOpen = writable(true);

	const toggleSidebar = () => {
		isSidebarOpen.update((prev) => !prev);
	};

	// Client API:
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
