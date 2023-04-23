import { localStore } from '$lib/stores';
import type { ProgramID } from 'lib/programs';

export type CustomWindow = {
  id: string;
  programId: ProgramID;
  programData?: unknown,
  title: string;
  x: number;
  y: number;
  padding?: number;
  height: number;
  width: number;
  minHeight?: number;
  minWidth?: number;
  active?: boolean;
  resizable?: boolean;
  view: "maximized" | "minimized" | "normal";
}

export function createWindow(w: Partial<Omit<CustomWindow, "id" | "view">>) {

  const width = w?.width ?? globalThis?.innerWidth / 2;
  const height = w?.height ?? globalThis?.innerHeight / 2;

  windows.update(_w => [..._w, {
    x: w.x ?? globalThis?.innerWidth / 4,
    y: w.y ?? globalThis?.innerHeight / 4,
    title: w.title ?? "Untitled",
    programId: w.programId || "ie",
    resizable: w.resizable ?? true,
    view: "normal",
    minWidth: w.minWidth ?? 200,
    minHeight: w.minHeight ?? 300,
    width,
    height,
    id: Math.random().toString(36).slice(2, 9),
  }]);
  setTimeout(() => {
    windows.update(windows => [...windows]);
  }, 50);
}

export const windows = localStore<CustomWindow[]>("windows/v1", []);

// windows.subscribe(w => console.log(w));
