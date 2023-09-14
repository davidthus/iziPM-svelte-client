<script lang="ts">
	import LabelInput from 'components/LabelInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	// Client API:
	const { form } = superForm(data.form);
</script>

<section>
	<header>
		<h1>Sign Up</h1>
	</header>
	<main>
		<form class="form" method="post">
			<LabelInput value={$form.username} name="username">Username</LabelInput>
			<LabelInput value={$form.email} name="email">Email</LabelInput>
			<LabelInput value={$form.password} name="password">Password</LabelInput>

			<button type="submit">Sign up</button>
		</form>
	</main>
	<footer>
		<a href="/">Back to Home</a>
	</footer>
</section>
