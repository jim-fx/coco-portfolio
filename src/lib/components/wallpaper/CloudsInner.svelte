<script>
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
	<T.PlaneGeometry attach="geometry" args={[10, 10]} />
	<T.ShaderMaterial
		vertexShader={vertShader}
		fragmentShader={fragShader}
		{uniforms}
		attach="material"
	/>
</T.Mesh>
