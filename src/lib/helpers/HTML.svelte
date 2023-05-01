<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let html: string;
	const dispatch = createEventDispatcher();
	let wrapper: HTMLDivElement;

	$: if (html && wrapper) {
		dispatch('html', wrapper);
	}
</script>

<div class="wrapper" bind:this={wrapper}>
	{@html html}
</div>
