<script lang="ts">
	export let form: any;
	export let name: string;
</script>

<label for={name} class="flex flex-col">
	<slot />
	<input class="text-primary-200 bg-surface-800" type="text" {name} bind:value={$form[name]} />
</label>
