<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ResizeWindow from './ResizeWindow.svelte';

	export let title = 'Unnamed Window';
	export let x = 0;
	export let y = 0;
	export let width = 300;
	export let height = 300;
	export let active = false;

	export let icon = '';

	let mouseDown = false;
	let mouseDownX = 0;
	let mouseDownY = 0;
	let downX = x;
	let downY = y;

	const dispatch = createEventDispatcher();

	function handleMouseDown(event: MouseEvent) {
		mouseDown = true;
		mouseDownX = event.clientX;
		mouseDownY = event.clientY;
		downX = x;
		downY = y;
		dispatch('activate');
	}

	function handleMouseUp(event: MouseEvent) {
		mouseDown = false;
	}

	function handleMouseMove(event: MouseEvent) {
		if (mouseDown) {
			x = downX + (event.clientX - mouseDownX);
			y = downY + (event.clientY - mouseDownY);
		}
	}
</script>

<svelte:window on:mouseup={handleMouseUp} on:mousemove={handleMouseMove} />

<div
	class="window"
	style={`left: ${x}px; top: ${y}px; width: ${width}px; height: ${height}px; z-index: ${
		active ? '100' : '1'
	}`}
>
	<ResizeWindow bind:x bind:y bind:height bind:width />

	<div class="title-bar" on:mousedown={handleMouseDown}>
		{#if icon}
			<img src={icon} alt="program icon" />
		{/if}
		<div class="title-bar-text">{title}</div>
		<div class="title-bar-controls">
			<button aria-label="Minimize" on:click={() => dispatch('minimize')} />
			<button aria-label="Maximize" on:click={() => dispatch('maximize')} />
			<button aria-label="Close" on:click={() => dispatch('close')} />
		</div>
	</div>
	<div class="window-body">
		<div>
			<slot />
		</div>
	</div>
</div>

<style>
	.window {
		position: absolute;
	}
	img {
		height: 16px;
	}
	.window-body > div {
		overflow: hidden;
		max-height: 100%;
	}
</style>
