export const wallpapers = {
  default: {
    image: "wallpaper.jpg"
  },
  clouds: {
    image: "clouds.jpg",
  },
  "clouds-animated": {
    component: () => import("./Clouds.svelte")
  },
  bricks: {
    image: "tiled-bricks.png",
  },
  bubbles: {
    image: "tiled-bubbles.png",
  },
  stones: {
    image: "tiled-stones.png",
  },
  cube: {
    component: () => import("./Cube.svelte"),
  },
} as const;

export type WallpaperKey = keyof typeof wallpapers;
