<script lang="ts">
	import { createWindow, settings } from '$lib/data';
	import programs from 'lib/programs';
	import Wallpaper from '$lib/components/wallpaper';
	import { time, windows } from '$lib/data';
	import StartMenu from 'lib/components/StartMenu.svelte';
	import { clickOutside } from 'lib/helpers/clickOutside';
	import ProgramIcon from 'lib/components/ProgramIcon.svelte';

	let showStartMenu = false;

	type ValueOf<T> = T[keyof T];
	type Entries<T> = [keyof T, ValueOf<T>][];

	// Same as `Object.entries()` but with type inference
	function objectEntries<T extends object>(obj: T): Entries<T> {
		return Object.entries(obj) as Entries<T>;
	}
	const _programs = objectEntries(programs);

	if ($windows.length === 0) {
		createWindow({
			programId: 'help',
			x: 100,
			y: 100,
			width: (globalThis?.innerWidth || 800) * 0.5,
			height: (globalThis?.innerHeight || 1000) * 0.5,
			title: 'New'
		});
	}
</script>

<svelte:head>
	<title>Code & Context Portfolio C/R</title>
</svelte:head>

<main>
	{#if showStartMenu}
		<div use:clickOutside on:click_outside={() => (showStartMenu = false)}>
			<StartMenu />
		</div>
	{/if}

	{#each _programs as [id, p]}
		<span class="icon">
			<ProgramIcon
				icon={p.icon}
				on:click={() => {
					createWindow({
						programId: id,
						title: 'New'
					});
				}}
			/>
			<span>{id}</span>
		</span>
	{/each}
	<slot />

	<Wallpaper wallpaper={$settings?.wallpaper} />
</main>
<footer>
	<div class="start-bar">
		<button class="start-button" on:click={() => (showStartMenu = !showStartMenu)} />
		<div class="bar-windows">
			{#each $windows.filter(Boolean).filter((w) => w.view === 'minimized') as w}
				<div
					class="minimized-window"
					on:keydown={(e) => {
						if (e.key === 'Enter') {
							w.view = 'normal';
						}
					}}
					on:click={() => {
						w.view = 'normal';
					}}
				>
					<ProgramIcon size="small" icon={programs[w.programId].icon} />
					{w.title}
				</div>
			{/each}
		</div>

		<div class="bar-status status-bar-field">
			<p>{$time.getHours()}:{$time.getMinutes()}</p>
		</div>
	</div>
</footer>

<style>
	main {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
	}

	.start-bar {
		display: grid;
		grid-template-columns: 60px 1fr min-content;
		padding: 2px;
		box-shadow: inset 1px 0 #fff;
		background-color: silver;
		width: 100%;
		height: 100%;
		border-top: 1px solid #f4f4f4;
		border-bottom: 1px solid #4e4e4e;
		user-select: none;
		box-sizing: border-box;
	}

	.bar-status > p {
		margin: 0;
		padding: 0;
	}

	.start-bar > * {
		height: 24px;
	}

	.minimized-window {
		height: calc(100% - 8px);
		margin-top: 1px;
		padding: 2px;
		border: solid thin;
		width: fit-content;
		display: flex;
		align-items: center;
		gap: 5px;
	}
	.minimized-window :global(img) {
		height: 20px;
	}

	.start-button {
		min-width: 0px !important;
		min-height: 0px !important;
		background: url(/start-button.png) no-repeat;
		background-size: 80%;
		background-position: center;
		image-rendering: pixelated;
	}

	.bar-windows {
		flex: 1;
		display: flex;
		gap: 5px;
		padding-left: 5px;
	}

	.bar-status {
		width: fit-content;
	}

	:global(body) {
		margin: 0;
		height: 100vh;
		overflow: hidden;
		display: grid;
		grid-template-rows: 1fr 30px;
	}
	.icon {
		display: flex;
		flex-wrap: wrap;
		width: 32px;
		gap: 5px;
		margin-bottom: 10px;
	}
</style>
