<script lang="ts">
	import type { CustomWindow } from '$lib/data/windows';
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
	export let w: CustomWindow;
	w.width = 200;
	w.height = 240;
	w.minHeight = 240;
	w.minWidth = 200;
	w.resizable = false;
	w.title = 'Gif Generator';
	w = { ...w };

	const giphy = {
		baseURL: 'https://api.giphy.com/v1/gifs/',
		apiKey: '0UTRbFtkMxAplrohufYco5IY74U8hOes',
		tag: '90s',
		type: 'random',
		rating: 'pg-13'
	};
	// Giphy API URL
	let giphyURL = encodeURI(
		giphy.baseURL +
			giphy.type +
			'?api_key=' +
			giphy.apiKey +
			'&tag=' +
			giphy.tag +
			'&rating=' +
			giphy.rating
	);

	let url = urls[Math.floor(Math.random() * urls.length)];

	async function getGif() {
		const response = await fetch(giphyURL);
		const json = await response.json();
		url = json.data.images.original.url;
	}
</script>

<div class="wrapper">
	<img src={url} alt="gif" on:click={getGif} />
</div>

<style>
	.wrapper {
		width: 200px;
		height: 200px;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
