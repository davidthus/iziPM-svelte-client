<script lang="ts">
	import { useMutation } from '@sveltestack/svelte-query';
	import { writable } from 'svelte/store';
	import { superForm } from 'sveltekit-superforms/client';
	import { setCredentials } from '../../features/auth/auth';
	import getTokenPayload from '../../util/getTokenPayload';

	export let data;

	// Client API:
	const { form } = superForm(data.form);
</script>

<section>
	<header>
		<h1>Login</h1>
	</header>
	<main>
		<form class="form" method="post">
			<label for="email">E-mail</label>
			<input type="email" name="email" bind:value={$form.email} />

			<label for="password">Password</label>
			<input type="password" name="password" bind:value={$form.password} />

			<button type="submit">Login</button>
		</form>
	</main>
	<footer>
		<a href="/">Back to Home</a>
	</footer>
</section>
