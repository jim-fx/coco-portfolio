<script lang="ts">
	import Window from '$lib/components/Window.svelte';
	import { windows } from '$lib/data';
	import programs, { loadProgram } from '$lib/programs';

	function handleActivate(id: string) {
		$windows = $windows.filter(Boolean).map((w) => {
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

	function handleMaximize(id: string) {
		$windows = $windows.filter(Boolean).map((w) => {
			if (w.id === id) {
				w.view = w.view === 'maximized' ? 'normal' : 'maximized';
			}
			return w;
		});
	}

	function handleMinimize(id: string) {
		$windows = $windows.filter(Boolean).map((w) => {
			if (w.id === id) {
				w.view = w.view === 'minimized' ? 'normal' : 'minimized';
			}
			return w;
		});
	}
</script>

{#each $windows.filter(Boolean).filter((w) => w.view !== 'minimized') as w (w.id)}
	<Window
		title={w.title}
		icon={programs[w.programId].icon}
		bind:x={w.x}
		bind:y={w.y}
		bind:width={w.width}
		bind:height={w.height}
		bind:minWidth={w.minWidth}
		bind:minHeight={w.minHeight}
		bind:padding={w.padding}
		active={w.active}
		resizable={w.resizable}
		view={w.view}
		on:close={() => ($windows = $windows.filter((w2) => w2.id !== w.id))}
		on:maximize={() => handleMaximize(w.id)}
		on:minimize={() => handleMinimize(w.id)}
		on:activate={() => handleActivate(w.id)}
	>
		{#await loadProgram(w.programId)}
			<p>Loading</p>
		{:then component}
			<svelte:component this={component} data={w.programData} bind:w />
		{/await}
	</Window>
{/each}
