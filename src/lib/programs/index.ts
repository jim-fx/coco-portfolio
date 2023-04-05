import type { SvelteComponent } from "svelte";

const programs = {
  gif: {
    component: () => import("./Gif.svelte"),
    icon: "https://win98icons.alexmeub.com/icons/png/wia_img_color_sound-0.png"
  },
  settings: {
    component: () => import("./Settings.svelte"),
    unique: true,
    icon: "https://win98icons.alexmeub.com/icons/png/paint_file-2.png",
  }
}

export type ProgramID = keyof typeof programs;

const loaded: Map<keyof typeof programs, Promise<typeof SvelteComponent> | undefined> = new Map();
export function loadProgram(id: ProgramID) {
  if (loaded.has(id)) return loaded.get(id);
  const loadingPromise = programs[id].component().then(m => m.default);
  loaded.set(id, loadingPromise);
  return loadingPromise;
}
export default programs;
