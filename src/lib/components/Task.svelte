<script lang="ts">
	import type { Task } from '$lib/data/tasks';
	import { localStore } from '$lib/stores';
	import { formatDate } from 'lib/helpers/humaneDate';
	import { renderMarkdown } from '$lib/helpers/renderMarkdown';

	export let task: Task;
	export let depth = 0;

	const id = ((performance.now() + Math.random()).toString(36) + task.id).substring(7);

	const done = localStore(task.id, task.done);

	$: {
		task.done = $done;
	}
</script>

{#if depth === 0}
	<fieldset class="row">
		<legend>
			<input type="checkbox" bind:checked={$done} disabled={task.id === 'tbd'} {id} />
			<label for={id}>{task.name} &nbsp;<i>{task?.date ? `${formatDate(task.date)}` : ''}</i></label
			>
		</legend>
		{#if task.description}
			<details>
				<summary>Details</summary>
				{#await renderMarkdown(task.description) then content}
					{console.log(task, content)}
					<p>{@html content}</p>
				{/await}
			</details>
		{/if}
		{#if task.tasks?.length}
			<div class="children">
				{#each task.tasks as t}
					<svelte:self depth={depth + 1} task={t} />
				{/each}
			</div>
		{/if}
	</fieldset>
{:else}
	<div class="row">
		<input type="checkbox" bind:checked={$done} disabled={task.id === 'tbd'} {id} />
		<label for={id}>{task.name}</label>
		{#if task.description}
			<details>
				<summary>Details</summary>
				{#await renderMarkdown(task.description) then content}
					<p>{@html content}</p>
				{/await}
			</details>
		{/if}
	</div>
{/if}

<style>
	details {
		margin-top: 5px;
		margin-bottom: 15px;
		border: solid thin;
		border-style: dashed;
		padding: 5px;
	}
	.children {
		padding-left: 10px;
		padding-top: 5px;
		margin-bottom: 10px;
	}
	.row {
		margin-bottom: 5px;
	}
</style>
