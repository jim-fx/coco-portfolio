import type { SvelteComponent } from "svelte";

const programs = {
  help: {
    component: () => import("./Help.svelte"),
    icon: "help_book_cool-4.png"
  },
  pinball: {
    component: () => import("./Pinball.svelte"),
    icon: "pinball-32x32.png"
  },
  calendar: {
    component: () => import("./Calendar.svelte"),
    icon: "calendar-1.png"
  },
  gif: {
    component: () => import("./Gif.svelte"),
    icon: "wia_img_color_sound-0.png"
  },
  settings: {
    component: () => import("./Settings.svelte"),
    unique: true,
    icon: "paint_file-2.png",
  },
  todo: {
    component: () => import("./TODO.svelte"),
    unique: true,
    icon: "notepad_file-0.png"
  }
} as const;

export type ProgramID = keyof typeof programs;

const loaded: Map<keyof typeof programs, Promise<typeof SvelteComponent> | undefined> = new Map();
export function loadProgram(id: ProgramID) {
  if (loaded.has(id)) return loaded.get(id);
  const loadingPromise = programs[id].component().then(m => m.default);
  loaded.set(id, loadingPromise);
  return loadingPromise;
}
export default programs;
