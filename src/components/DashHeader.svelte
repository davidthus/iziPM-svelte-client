<script lang="ts">
	import { useMutation, useQuery } from '@sveltestack/svelte-query';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { sendLogout } from '../features/auth/queryFunctions';
	import { getUser } from '../features/users/queryFunctions';
	import type { newProjectFormData } from './types';

	export let data: newProjectFormData;

	// Client API:
	const { form, errors, resetForm } = superForm(data.form);

	const {
		mutate: sendLogoutMutation,
		isLoading: isLogoutLoading,
		isSuccess: isLogoutSuccess,
		isError: isLogoutError,
		error: logoutError
	} = useMutation(sendLogout);
	const { data: userData, isSuccess: isUserSuccess } = useQuery('user', getUser);
	console.log(data);

	// redirects when logout is successful
	$: if (isLogoutSuccess) {
		window.location.href = '/';
	}
</script>

<SuperDebug data={$form} />
{#if isUserSuccess}
	<header>
		<div>
			<a href="/dash">
				<h1>Welcome to iziPM</h1>
			</a>
			<nav>
				<button title="Logout" on:click={sendLogout}>
					<div class="logout icon" />
				</button>
				<form method="POST" on:submit={() => resetForm()}>
					<input type="text" name="projectName" bind:value={$form.projectName} />
					{#if $errors.projectName}
						<p>{$errors.projectName}</p>
					{/if}
					<button type="submit">Create project</button>
				</form>
			</nav>
		</div>
	</header>
{:else if isLogoutLoading}
	<p>Logging out...</p>
{:else if isLogoutError}
	<p>{logoutError?.data?.message}</p>
{/if}
