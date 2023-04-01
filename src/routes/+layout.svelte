<script lang="ts">
	import { createWindow, settings } from '$lib/data';
	import programs from 'lib/programs';
	import Wallpaper from '$lib/components/wallpaper';
</script>

{#each Object.entries(programs) as [id, p]}
	<img
		src={p.icon}
		alt="program icon"
		on:keypress={(e) => {
			if (e.key === 'Enter') {
				createWindow({
					programId: id,
					x: 100,
					y: 100,
					width: 300,
					height: 300,
					title: 'New'
				});
			}
		}}
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
<Wallpaper wallpaper={$settings?.wallpaper} />

<style>
	:global(body) {
		margin: 0;
		height: 100vh;
		overflow: hidden;
	}
</style>
