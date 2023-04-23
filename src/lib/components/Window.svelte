<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ResizeWindow from './ResizeWindow.svelte';
	import ProgramIcon from './ProgramIcon.svelte';
	import type programs from 'lib/programs';
	import type { ProgramID } from 'lib/programs';

	export let title = 'Unnamed Window';
	export let x = 0;
	export let y = 0;
	export let width = 300;
	export let height = 300;
	export let active = false;
	export let resizable = true;
	export let view = 'normal';

	export let icon: typeof programs[ProgramID]['icon'];

	export let minHeight = 300;
	export let minWidth = 200;

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
			x = Math.max(Math.min(downX + (event.clientX - mouseDownX), window.innerWidth - width), 0);
			y = Math.max(Math.min(downY + (event.clientY - mouseDownY), window.innerHeight - height), 0);
		}
	}
</script>

<svelte:window on:mouseup={handleMouseUp} on:mousemove={handleMouseMove} />

<div
	class="window view-{view}"
	style={`
    left: ${x}px; 
    top: ${y}px; 
    width: ${width}px; 
    height: ${height}px; 
    z-index: ${active ? '100' : '1'};
    min-width: ${minWidth}px;
    min-height: ${minHeight}px;
`}
>
	{#if resizable}
		<ResizeWindow bind:x bind:y bind:height bind:width />
	{/if}

	<div class="title-bar" on:mousedown={handleMouseDown}>
		{#if icon}
			<ProgramIcon {icon} size="small" />
		{/if}
		<div class="title-bar-text">{title}</div>
		<div class="title-bar-controls">
			<button aria-label="Minimize" on:click={() => dispatch('minimize')} />
			<button aria-label="Maximize" on:click={() => dispatch('maximize')} />
			<button aria-label="Close" on:click={() => dispatch('close')} />
		</div>
	</div>
	<div class="window-body">
		<div style="display:contents;">
			<slot />
		</div>
		<div class="status-bar">
			<slot name="status-bar" />
		</div>
	</div>
</div>

<style>
	.window {
		position: absolute;
	}

	.window.view-maximized {
		left: 10px !important;
		top: 10px !important;
		height: calc(100vh - 30px) !important;
		width: calc(100vw - 30px) !important;
	}
	.window-body {
		overflow: auto;
		height: calc(100% - 40px);
	}
	.window-body > div {
		overflow: auto;
		max-height: 100%;
	}
	.title-bar-text {
		flex: 1;
		margin-left: 8px;
		pointer-events: none;
		user-select: none;
	}
</style>
