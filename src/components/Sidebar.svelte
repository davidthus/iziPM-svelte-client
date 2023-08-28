<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { sendLogout } from '../features/auth/queryFunctions';
	import type { PageData } from '../routes/$types';
	export let data: PageData;
	export let toggleSidebar: () => void;

	// Client API:
	const { form, errors } = superForm(data.form);

	console.log(data);
</script>

<SuperDebug data={$form} />
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
