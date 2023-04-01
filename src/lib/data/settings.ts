import type { WallpaperKey } from "$lib/components/wallpaper/types";
import { localStore } from "lib/stores";

export type Settings = {
  wallpaper: WallpaperKey;
}

export const settings = localStore<Settings>("settings/v1", {
  wallpaper: "clouds"
})
