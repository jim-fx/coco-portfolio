<script lang="ts">
	import ResizeHandle from './ResizeHandle.svelte';

	export let x: number;
	export let y: number;
	export let width: number;
	export let height: number;

	export let minHeight = 300;
	export let minWidth = 100;
</script>

<ResizeHandle direction="top" {minHeight} {minWidth} bind:width bind:height bind:x bind:y />
<ResizeHandle direction="right" {minHeight} {minWidth} bind:width bind:height bind:x bind:y />
<ResizeHandle direction="bottom" {minHeight} {minWidth} bind:width bind:height bind:x bind:y />
<ResizeHandle direction="left" {minHeight} {minWidth} bind:width bind:height bind:x bind:y />

<ResizeHandle direction="top-left" {minHeight} {minWidth} bind:width bind:height bind:x bind:y />
<ResizeHandle direction="top-right" {minHeight} {minWidth} bind:width bind:height bind:x bind:y />
<ResizeHandle
	direction="bottom-right"
	{minHeight}
	{minWidth}
	bind:width
	bind:height
	bind:x
	bind:y
/>
<ResizeHandle direction="bottom-left" {minHeight} {minWidth} bind:width bind:height bind:x bind:y />
