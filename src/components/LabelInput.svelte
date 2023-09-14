<script lang="ts">
	export let value: string;
	export let name: string;
</script>

<label for={name} class="flex flex-col">
	<slot />
	<input class="text-primary-900 bg-surface-800" type="text" {name} bind:value />
</label>
