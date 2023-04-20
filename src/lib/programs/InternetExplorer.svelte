<script lang="ts">
	import { remark } from 'remark';
	import html from 'remark-html';
	import rehypeHighlight from 'rehype-highlight';
	import remarkGfm from 'remark-gfm';
	import { rehype } from 'rehype';
	import { tick } from 'svelte';
	import historyStore from 'lib/stores/historyStore';
	import type { CustomWindow } from 'lib/data';
	import { base } from '$app/paths';

	export let w: CustomWindow;
	w.title = 'Internet Explorer';
	let contentWrapper: HTMLDivElement;
	let path = historyStore('/content/index.md');
	let content = '';

	let forwardPossible = false;
	let backwardPossible = false;
	$: if ($path) {
		forwardPossible = path.nextValue !== null;
		backwardPossible = path.previousValue !== null;
	}

	function updateLinks() {
		if (!contentWrapper) return '';
		contentWrapper.querySelectorAll('a').forEach((a) => {
			let newPath = a.getAttribute('href');
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
	$: if (contentWrapper) updateLinks();

	async function render(url: string) {
		const response = await fetch(base + url);
		const input = await response.text();
		const htmlContent = await remark().use(remarkGfm).use(html, { sanitize: false }).process(input);

		const result = await rehype()
			.data('settings', { fragment: true })
			.use(rehypeHighlight)
			.process(htmlContent);
		content = result.toString();
		await tick();
		setTimeout(updateLinks, 100);
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
	<div class="content" bind:this={contentWrapper}>
		{@html content}
	</div>
{/if}

<style>
	.content :global(h1) {
		font-size: 2em;
	}

	.content :global(h2) {
		font-size: 1.5em;
	}
	.content :global(.hljs) {
		background: none;
		font-size: 1.2em;
	}
</style>
