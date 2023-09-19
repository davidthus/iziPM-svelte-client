<script lang="ts">
	import LabelInput from '@/components/LabelInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	// Client API:
	const { form } = superForm(data.form);
</script>

<section>
	<header>
		<h1>Login</h1>
	</header>
	<main>
		<form class="form" method="post">
			<LabelInput {form} name="email">Email</LabelInput>
			<LabelInput {form} name="password">Password</LabelInput>

			<button type="submit">Login</button>
		</form>
	</main>
	<footer>
		<a href="/">Back to Home</a>
	</footer>
</section>
