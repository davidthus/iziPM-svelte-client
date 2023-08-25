<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { sendLogout } from '../features/auth/queryFunctions';
	export let data;
	export let toggleSidebar: () => void;

	// Client API:
	const { form, errors } = superForm(data.form);

	const logoutMutation = useMutation(sendLogout);
	console.log(data);

	// redirects when logout is successful
	$: if ($logoutMutation.isSuccess) {
		window.location.href = '/';
	}
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
{:else if $logoutMutation.isLoading}
	<p>Logging out...</p>
{:else if $logoutMutation.isError}
	<p>{$logoutMutation.error?.data?.message}</p>
{/if}
