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

export function createWindow(w: Omit<CustomWindow, "id" | "view">) {
  windows.update(_w => [..._w, {
    ...w,
    resizable: w.resizable ?? true,
    view: "normal",
    minHeight: w.minHeight ?? 300,
    minWidth: w.minWidth ?? 200,
    id: Math.random().toString(36).slice(2, 9),
  }]);
  setTimeout(() => {
    windows.update(windows => [...windows]);
  }, 50);
}

export const windows = localStore<CustomWindow[]>("windows/v1", []);

// windows.subscribe(w => console.log(w));
