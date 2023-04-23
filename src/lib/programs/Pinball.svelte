<script lang="ts">
	import type { CustomWindow } from '$lib/data/windows';

	export let w: CustomWindow;

	$: if (w) {
		w.title = 'Space Cadet Pinball';
		w.width = 650;
		w.height = 500;
		w.resizable = false;
		w.padding = 0;
	}
	let loaded = false;
</script>

<div class="wrapper" class:loaded>
	<iframe
		on:load={() => (loaded = true)}
		src="https://98.js.org/programs/pinball/space-cadet.html"
		title="Pinbal"
	/>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		position: relative;
		opacity: 0;
	}

	.wrapper.loaded {
		opacity: 1;
	}

	iframe {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
</style>
