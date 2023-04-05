<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import vertShader from './clouds.vert';
	import fragShader from './clouds.frag';

	const uniforms = {
		uTime: { value: 0 }
	};

	useFrame(({ clock }) => {
		uniforms.uTime.value = clock.getElapsedTime();
	});
</script>

<T.Mesh>
	<T.OrthographicCamera args={[-1, 1, 1, -1, 0, 1]} makeDefault />
	<T.PlaneGeometry attach="geometry" args={[1000, 1000]} />
	<T.ShaderMaterial
		vertexShader={vertShader}
		fragmentShader={fragShader}
		{uniforms}
		attach="material"
	/>
</T.Mesh>
