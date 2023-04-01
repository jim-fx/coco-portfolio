export const wallpapers = {
  clouds: {
    image: "clouds.jpg",
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
  }
} as const;

export type WallpaperKey = keyof typeof wallpapers;
