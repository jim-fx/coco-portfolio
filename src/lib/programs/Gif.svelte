<script lang="ts">
	const urls = [
		'https://i.giphy.com/media/dwmNhd5H7YAz6/giphy.webp',
		'https://i.giphy.com/media/3If8u5wFsfII0/giphy.webp',
		'https://i.giphy.com/media/anjRJ4nv9WJzO/giphy.webp',
		'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjE3YjA0NjAwMWMwNDBhZjE5NTE3N2VhNmNlZTJhNDM1ODgxODcwMiZjdD1n/TfjLMgZ50avqazGWaH/giphy.gif',
		'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzMyZmJhMzNlYmY3NWE4ZjBhNjIzNjIyYzBjNTljODExNDQwZjkyNiZjdD1n/umDyH9UVIoSIHxvYAR/giphy.gif',
		'https://i.giphy.com/media/fmeTX8AURI4co/giphy.webp',
		'https://i.giphy.com/media/K4ppHUZTYKJYk/giphy.webp',
		'https://i.giphy.com/media/PvKlwYTiKATRe/giphy.webp',
		'https://i.giphy.com/media/RxR1KghIie2iI/giphy.webp',
		'https://i.giphy.com/media/OeEVCJ2UqMQNO/giphy.webp'
	];

	let url = urls[Math.floor(Math.random() * urls.length)];
</script>

<button on:click={() => (url = urls[Math.floor(Math.random() * urls.length)])}>rand</button>
<img src={url} alt="gif" />

<style>
	button {
		position: absolute;
	}
	img {
		width: 100%;
		height: 100%;
	}
</style>
