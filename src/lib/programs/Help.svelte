<script lang="ts">
	import { tick } from 'svelte';
	import historyStore from 'lib/stores/historyStore';
	import { createWindow, type CustomWindow } from 'lib/data';
	import { base } from '$app/paths';
	import HTML from '$lib/helpers/HTML.svelte';
	import { renderMarkdown } from 'lib/helpers/renderMarkdown';
	import type { ProgramID } from '.';

	export let w: CustomWindow;
	w.title = 'Help';
	let path = historyStore('/content/index.md');
	let content = '';

	$: forwardPossible = $path && path?.nextValue !== null;
	$: backwardPossible = $path && path?.previousValue !== null;

	function updateLinks(contentWrapper: HTMLElement) {
		console.log({ contentWrapper });
		if (!contentWrapper) return '';
		contentWrapper.querySelectorAll('a').forEach((a) => {
			let newPath = a.getAttribute('href');

			if (newPath && newPath.startsWith('@')) {
				let p = newPath;
				a.addEventListener('click', (e) => {
					e.stopPropagation();
					e.preventDefault();
					createWindow({
						programId: p.slice(1) as ProgramID
					});
				});
			}

			if (!newPath?.endsWith('.md')) {
				a.setAttribute('target', '_blank');
				return;
			}
			a.addEventListener('click', (e) => {
				e.stopPropagation();
				e.preventDefault();
				if (newPath && newPath !== $path) {
					$path = newPath;
				}
			});
		});
		return '';
	}

	async function render(url: string) {
		const response = await fetch(base + url);
		const input = await response.text();
		content = await renderMarkdown(input);
	}

	$: if ($path) {
		render($path);
	}
</script>

<div class="header">
	<button disabled={!backwardPossible} on:click={() => path.undo()}>Back</button>
	<button disabled={!forwardPossible} on:click={() => path.redo()}>Forward</button>
</div>
{#if path}
	<div class="content">
		<HTML html={content} on:html={(ev) => updateLinks(ev.detail)} />
	</div>
{/if}

<style>
	.content :global(h1) {
		font-size: 2em;
	}

	.content :global(img) {
		width: 90%;
		margin-left: 5%;
	}

	.content :global(h2) {
		font-size: 1.5em;
	}
	.content :global(.hljs) {
		background: none;
		font-size: 1.2em;
	}
</style>
