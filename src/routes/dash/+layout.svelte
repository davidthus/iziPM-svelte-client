<script lang="ts">
	import { writable } from 'svelte/store';
	import DashFooter from '../../components/DashFooter.svelte';
	import DashHeader from '../../components/DashHeader.svelte';
</script>

<DashHeader />
<div>
	<slot />
</div>
<DashFooter />
