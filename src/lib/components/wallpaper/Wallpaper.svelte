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
		<div class="image black">
			<div class="image bounce">
				<Canvas size={{ width: 80, height: 80 }}>
					<svelte:component this={comp.default} />
				</Canvas>
			</div>
		</div>
	{/await}
{:else if imageUrl}
	<div
		class="image"
		style={`background-image: url(${imageUrl}); background-size: ${
			imageUrl.includes('tiled-') ? 'unset' : 'cover'
		}`}
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
	.image :global(canvas) {
		width: 20vw !important;
		height: 20vw !important;
		image-rendering: pixelated;
	}

	.black {
		background-color: black;
	}

	.bounce {
		animation: moveX 12s linear 6s infinite alternate, moveY 12s linear 0s infinite alternate;
	}

	@keyframes moveX {
		from {
			left: 0;
		}
		to {
			left: calc(100vw - 20vw);
		}
	}

	@keyframes moveY {
		from {
			top: 0;
		}
		to {
			top: calc(100vh - 20vw);
		}
	}
</style>
