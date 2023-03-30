<script lang="ts">
	import type { SvelteComponentTyped } from 'svelte';

	export let promise: () => Promise<SvelteComponentTyped>;

	export let component: SvelteComponentTyped | undefined = undefined;
	$: if (!component && promise) {
		promise().then((comp) => {
			if (component) return;
			component = comp;
		});
	}
</script>

{#if !component}
	<p>Making a sandwich</p>
{:else}
	<slot {component} />
{/if}
