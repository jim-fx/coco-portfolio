<script lang="ts">
	import { browser } from '$app/environment';
	import { Canvas } from '@threlte/core';
	import { type WallpaperKey, wallpapers } from './types';

	export let wallpaper: WallpaperKey;

	let imageUrl: string | undefined;

	$: if (wallpapers[wallpaper] && browser) {
		if (wallpapers[wallpaper].image) {
			const img = new Image();
			img.src = `wallpapers/${wallpapers[wallpaper].image}`;
			img.onload = () => {
				imageUrl = img.src;
			};
		} else {
			imageUrl = undefined;
		}
	}
</script>

{#if wallpapers[wallpaper] && wallpapers[wallpaper]?.component}
	{#await wallpapers[wallpaper].component()}
		<div>Loading...</div>
	{:then comp}
		<div class="image">
			<svelte:component this={comp.default} />
		</div>
	{/await}
{:else if imageUrl}
	<div
		class="image"
		style={`
      background-image: url(${imageUrl}); 
      background-size: ${imageUrl.includes('tiled-') ? 'unset' : 'cover'};
      image-rendering: ${imageUrl.includes('pixel-') ? 'pixelated' : 'unset'};
`}
	/>
{/if}

<style>
	.image {
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: -1;
		pointer-events: none;
		object-fit: cover;
		background-position: center;
	}
</style>
