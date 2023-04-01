<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { GLTF, useGltfAnimations } from '@threlte/extras';
	import { Euler, OrthographicCamera } from 'three';

	const { gltf, actions } = useGltfAnimations<'Take 001'>();

	$: if ($actions) {
		Object.entries($actions).forEach(([name, action]) => {
			action.play();
		});
	}

	const rotation = [0, 0, 0] as [number, number, number];

	useFrame(() => {
		rotation[0] += 0.004;
		rotation[1] += 0.004;
		rotation[2] += 0.004;
	});
</script>

<!-- <T.OrthographicCamera args={[-10, 1, 1, -1, 0, 100]} makeDefault /> -->
<T.PerspectiveCamera position={[0, 0, 5]} args={[50, 1, 0.1, 1000]} makeDefault />

<T.AmbientLight />

<GLTF
	{rotation}
	bind:gltf={$gltf}
	url="cube.glb"
	useDraco="https://www.gstatic.com/draco/v1/decoders/"
/>

