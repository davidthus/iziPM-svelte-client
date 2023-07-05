<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms/index';
	import type { z } from 'zod';
	import DashFooter from '../../components/DashFooter.svelte';
	import DashHeader from '../../components/DashHeader.svelte';
	import Sidebar from '../../components/Sidebar.svelte';

	interface FormData {
		form: SuperValidated<
			z.ZodObject<
				{
					projectName: z.ZodString;
				},
				'strip',
				z.ZodTypeAny,
				{
					projectName: string;
				},
				{
					projectName: string;
				}
			>,
			any
		>;
	}
	export let data;
</script>

<DashHeader />
<Sidebar {data} />
<div>
	<slot />
</div>
<DashFooter />
