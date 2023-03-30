<script lang="ts">
	import Window from '$lib/components/Window.svelte';
	import { windows, createWindow } from '$lib/data';
	import programs, { loadProgram } from '$lib/programs';
	function handleActivate(id: string) {
		$windows = $windows.map((w) => {
			if (w.id === id) {
				w.active = true;
			} else {
				w.active = false;
			}
			return w;
		});

		let activeWindow = $windows.reverse().find((w) => w.active);
		if (activeWindow) {
			$windows = [
				activeWindow,
				...$windows.filter((w) => w !== activeWindow).map((w) => ({ ...w, active: false }))
			];
		}
	}
</script>

{#each $windows as w (w.id)}
	<Window
		title={w.title}
		icon={programs[w.programId].icon}
		bind:x={w.x}
		bind:y={w.y}
		bind:width={w.width}
		bind:height={w.height}
		active={w.active}
		on:close={() => ($windows = $windows.filter((w2) => w2.id !== w.id))}
		on:activate={() => handleActivate(w.id)}
	>
		{#await loadProgram(w.programId)}
			<p>Loading</p>
		{:then component}
			<svelte:component this={component} data={w.programData} bind:window={w} />
		{/await}
	</Window>
{/each}
