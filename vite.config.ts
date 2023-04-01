import { sveltekit } from '@sveltejs/kit/vite';
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [threeMinifier(), sveltekit()],
  ssr: {
    noExternal: ['three'],
    external: ['three/examples/jsm/objects/GroundProjectedEnv']
  }
});
