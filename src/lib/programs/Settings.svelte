<script lang="ts">
	import { settings } from '$lib/data';
	import { wallpapers } from '$lib/components/wallpaper/types';
	export let w: CustomWindow;
	w.title = 'Settings';
	const id = Math.random().toString(36).slice(2, 9);

	let activeWallpaper = $settings.wallpaper;
	$: if (activeWallpaper) {
		$settings.wallpaper = activeWallpaper;
	}
	$: if ($settings.wallpaper) {
		updateWallpaper();
	}

	function updateWallpaper() {
		if (activeWallpaper !== $settings.wallpaper) {
			activeWallpaper = $settings.wallpaper;
		}
	}
</script>

<fieldset>
	<legend>Wallpaper</legend>

	{#each Object.keys(wallpapers) as wallpaper, i}
		<div class="field-row">
			<input
				id={`radio${i}-${id}`}
				bind:group={activeWallpaper}
				type="radio"
				value={wallpaper}
				name="fieldset-example2"
			/>
			<label for={`radio${i}-${id}`}>{wallpaper}</label>
		</div>
	{/each}
</fieldset>
