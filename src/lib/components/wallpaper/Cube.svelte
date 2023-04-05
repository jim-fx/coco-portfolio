<script lang="ts">
	import { Canvas } from '@threlte/core';
	import CubeInner from './CubeInner.svelte';
</script>

<div class="image black">
	<div class="image bounce">
		<Canvas size={{ width: 80, height: 80 }}>
			<CubeInner />
		</Canvas>
	</div>
</div>

<style>
	.image {
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: -1;
		pointer-events: none;
		object-fit: cover;
		background-position: center;
	}
	.black {
		background-color: #018184;
	}

	.bounce {
		animation: moveX 12s linear 6s infinite alternate, moveY 12s linear 0s infinite alternate;
	}

	.image :global(canvas) {
		width: 20vw !important;
		height: 20vw !important;
		image-rendering: pixelated;
	}

	@keyframes moveX {
		from {
			left: 0;
		}
		to {
			left: calc(100vw - 20vw);
		}
	}

	@keyframes moveY {
		from {
			top: 0;
		}
		to {
			top: calc(100vh - 20vw);
		}
	}
</style>
