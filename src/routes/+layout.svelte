<script lang="ts">
	import { createWindow, settings } from '$lib/data';
	import { base } from '$app/paths';
	import programs from 'lib/programs';
</script>

<div
	style={`background-image: url(wallpapers/${$settings.wallpaper}); background-size: ${
		$settings.wallpaper.startsWith('tiled-') ? 'unset' : 'cover'
	}`}
>
	{#each Object.entries(programs) as [id, p]}
		<img
			src={p.icon}
			alt="program icon"
			on:click={() =>
				createWindow({
					programId: id,
					x: 100,
					y: 100,
					width: 300,
					height: 300,
					title: 'New'
				})}
		/>
	{/each}
	<slot />
</div>

<style>
	:global(body) {
		margin: 0;
		height: 100vh;
	}
	div {
		height: 100%;
		background-position: center;
	}
</style>
