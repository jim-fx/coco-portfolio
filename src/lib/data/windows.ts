import { localStore } from '$lib/stores';
import type { ProgramID } from 'lib/programs';

type CustomWindow = {
  id: string;
  programId: ProgramID;
  programData: unknown,
  title: string;
  x: number;
  y: number;
  height: number;
  width: number;
  active: boolean;
}

export function createWindow(w: Omit<CustomWindow, "id">) {
  windows.update(_w => [..._w, {
    ...w,
    id: Math.random().toString(36).slice(2, 9),
  }]);
}

export const windows = localStore<CustomWindow[]>("windows/v1", []);

// windows.subscribe(w => console.log(w));
