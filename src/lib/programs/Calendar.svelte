<script lang="ts">
	import type { CustomWindow } from '$lib/data/windows';
	export let w: CustomWindow;
	const dates = [
		{
			date: new Date('2023-04-21')
		},
		{
			date: new Date('2023-05-05')
		},
		{
			date: new Date('2023-05-19')
		},
		{
			date: new Date('2023-05-19')
		},
		{
			date: new Date('2023-06-02')
		},
		{
			date: new Date('2023-06-16')
		}
	];

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

	function isTermin(d: Date) {
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
	<div class="header">
		{#each days as day}
			<p>{day}</p>
		{/each}
	</div>
	{#key currentDate}
		{#each new Array(WEEK_AMOUNT) as _, wi}
			<div class="week">
				{#each days as day, di}
					{@const d = getDate(wi, di)}
					<div
						class="day"
						class:active={isInCurrentMonth(d)}
						class:termin={isTermin(d)}
						class:today={isToday(d)}
					>
						{#if isInCurrentMonth(d)}
							<span>
								{d.getDate()}
							</span>
						{:else}
							<span>
								{d.getDate().toString().padStart(2, '0')}.{(d.getMonth() + 1)
									.toString()
									.padStart(2, '0')}
							</span>
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	{/key}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-items: stretch;
		height: 100%;
	}

	.header {
		display: flex;
		justify-items: stretch;
		width: 100%;
		opacity: 0.5;
		border-bottom: solid 1px black;
	}

	.header > p {
		flex: 1;
		margin: 5px;
	}

	.week {
		display: flex;
		flex: 1;
		justify-items: stretch;
		width: 100%;
		border-bottom: solid 1px black;
	}

	.day {
		position: relative;
		flex: 1;
		background: grey;
		padding: 5px;
		border-right: 1px solid black;
		box-sizing: border-box;
	}

	.day:first-child {
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
