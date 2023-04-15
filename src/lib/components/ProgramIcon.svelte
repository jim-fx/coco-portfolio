<script lang="ts">
	import type { ProgramID } from 'lib/programs';
	import { base } from '$app/paths';
	import type programs from '$lib/programs';
	import { createEventDispatcher } from 'svelte';

	export let icon: typeof programs[ProgramID]['icon'];
	export let size: 'small' | 'medium' | 'large' = 'medium';

	const width = size === 'small' ? 16 : size === 'medium' ? 32 : 64;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<img
	src={base + '/icons/' + icon}
	style="width: {width}px; height: {width}px;"
	alt="program icon"
	on:click={handleClick}
	on:keypress={(e) => {
		if (e.key === 'Enter') {
			handleClick();
		}
	}}
/>
