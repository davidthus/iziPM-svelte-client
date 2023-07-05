<script lang="ts">
	import { useMutation, useQuery } from '@sveltestack/svelte-query';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { sendLogout } from '../features/auth/queryFunctions';
	import { getUser } from '../features/users/queryFunctions';
	export let data;

	// Client API:
	const { form, errors, resetForm } = superForm(data.form);

	const logoutMutation = useMutation(sendLogout);
	const userQuery = useQuery('user', getUser);
	console.log(data);

	// redirects when logout is successful
	$: if ($logoutMutation.isSuccess) {
		window.location.href = '/';
	}
</script>

<SuperDebug data={$form} />
{#if $userQuery.isSuccess}
	<header>
		<div>
			<form method="POST" on:submit={() => resetForm()}>
				<input type="text" name="projectName" bind:value={$form.projectName} />
				{#if $errors.projectName}
					<p>{$errors.projectName}</p>
				{/if}
				<button type="submit">Create project</button>
			</form>
		</div>
		<div>
			<button title="Logout" on:click={sendLogout}>
				<div class="logout icon" />
			</button>
		</div>
	</header>
{:else if $logoutMutation.isLoading}
	<p>Logging out...</p>
{:else if $logoutMutation.isError}
	<p>{$logoutMutation.error?.data?.message}</p>
{/if}
