<script lang="ts">
	import type { CustomWindow } from '$lib/data/windows';
	import dates from '$lib/data/tasks';
	export let w: CustomWindow;

	const WEEK_AMOUNT = 6;

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	let monthOffset = 0;
	const now = new Date();
	$: currentDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
	$: startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

	$: if (w) {
		const intl = new Intl.DateTimeFormat('en', { month: 'long' });
		w.title = 'Calendar - ' + intl.format(currentDate);
	}

	function isInCurrentMonth(d: Date) {
		return d.getMonth() === currentDate.getMonth();
	}

	function daysInMonth(month: number, year: number) {
		return new Date(year, month, 0).getDate();
	}

	function getDate(weekIndex: number, dayIndex: number) {
		const firstDay = startOfMonth.getDay();
		const index = weekIndex * 7 + dayIndex - (firstDay - 2);

		if (index < 0) {
			const year =
				currentDate.getMonth() - 1 < 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
			const month = currentDate.getMonth() - 1 < 0 ? 11 : currentDate.getMonth() - 1;

			return new Date(year, month, daysInMonth(month + 1, year) + index);
		}

		const daysInNextMonth = daysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
		if (index > daysInNextMonth) {
			const year =
				currentDate.getMonth() + 1 > 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
			const month = currentDate.getMonth() + 1 > 11 ? 0 : currentDate.getMonth() + 1;
			return new Date(year, month, index - daysInNextMonth);
		}

		return new Date(currentDate.getFullYear(), currentDate.getMonth(), index);
	}

	function isToday(d: Date) {
		return d.toDateString() === now.toDateString();
	}

	function getTermin(d: Date) {
		return dates.find((date) => date.date.toDateString() === d.toDateString());
	}

	function handleKeyDown(ev: KeyboardEvent) {
		if (ev.key === 'ArrowRight') {
			monthOffset = monthOffset + 1;
		} else if (ev.key === 'ArrowLeft') {
			monthOffset = monthOffset - 1;
		}

		console.log(monthOffset);
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="wrapper">
	<div class="toolbar">
		<button on:click={() => (monthOffset = monthOffset - 1)}>Previous</button>
		<button on:click={() => (monthOffset = monthOffset + 1)}>Next</button>
	</div>
	<div class="content">
		{#each days as day}
			<p class="weekday">{day}</p>
		{/each}
		{#key currentDate}
			{#each new Array(WEEK_AMOUNT) as _, wi}
				{#each days as _, di}
					{@const d = getDate(wi, di)}
					{@const t = getTermin(d)}
					<div
						class="day"
						class:active={isInCurrentMonth(d)}
						class:termin={!!t}
						class:today={isToday(d)}
					>
						{#if isInCurrentMonth(d)}
							<span>
								{d.getDate()}
								{isToday(d) ? '(today)' : ''}
							</span>
						{:else}
							<span>
								{d.getDate().toString().padStart(2, '0')}.{(d.getMonth() + 1)
									.toString()
									.padStart(2, '0')}
							</span>
						{/if}

						{#if t}
							<div class="termin">
								{t.name}
							</div>
						{/if}
					</div>
				{/each}
			{/each}
		{/key}
	</div>
</div>

<style>
	.content {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: 30px repeat(6, 1fr);
		height: 100%;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-items: stretch;
		height: 100%;
	}

	.weekday {
		padding-left: 5px;
		opacity: 0.5;
		border-bottom: 1px solid black;
		margin: 0px;
		padding-top: 10px;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.day {
		position: relative;
		flex: 1;
		background: grey;
		padding: 5px;
		border-right: 1px solid black;
		border-bottom: 1px solid black;
		box-sizing: border-box;
	}

	.day:nth-child(7n + 1) {
		border-left: 1px solid black;
	}

	.termin {
		background: #00ff00 !important;
	}

	.today {
		font-weight: bold;
	}

	.day.active {
		background: none;
	}
</style>
