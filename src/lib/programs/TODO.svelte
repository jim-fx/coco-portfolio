<script lang="ts">
	import type { CustomWindow } from '$lib/data';
	import Task from '$lib/components/Task.svelte';
	export let w: CustomWindow;
	w.title = 'TODO';
	w.width = 250;
	w.height = 400;
	w.resizable = false;
	import tasks from '$lib/data/tasks';
</script>

{#each tasks as task}
	<Task {task} />
{/each}
