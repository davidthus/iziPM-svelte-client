<script>
	import DashFooter from '../../components/DashFooter.svelte';
	import DashHeader from '../../components/DashHeader.svelte';
</script>

<DashHeader />
<div>
	<slot />
</div>
<DashFooter />
