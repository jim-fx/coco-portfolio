import { sveltekit } from '@sveltejs/kit/vite';
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [threeMinifier(), sveltekit(), glsl()],
  ssr: {
    noExternal: ['three'],
    external: ['three/examples/jsm/objects/GroundProjectedEnv']
  }
});
