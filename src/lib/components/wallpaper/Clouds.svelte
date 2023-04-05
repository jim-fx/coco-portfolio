<script lang="ts">
	import { Canvas } from '@threlte/core';
	import CloudsInner from './CloudsInner.svelte';
	import { onMount } from 'svelte';

	let size = { width: 80, height: 80 };
	onMount(() => {
		size = { width: window.innerWidth / 4, height: window.innerHeight / 4 };
	});
</script>

<div class="wrapper">
	<Canvas {size}>
		<CloudsInner />
	</Canvas>
</div>

<style>
	.wrapper :global(canvas) {
		height: 100vh !important;
		width: 100vw !important;
		position: absolute;
		top: 0px;
		left: 0px;
		image-rendering: pixelated;
	}
</style>
