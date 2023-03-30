import { localStore } from "lib/stores";

export type Settings = {
  wallpaper: "clouds.jpg" | "tiled-bricks.png" | "tiled-stones.png" | "tiled-bubbles.png";
}

export const settings = localStore<Settings>("settings/v1", {
  wallpaper: "clouds.jpg"
})
