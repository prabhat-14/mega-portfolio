import { create } from "zustand";
import { AppId, WindowState } from "@/types/os";

interface OSStore {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  maxZIndex: number;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
}

const initialWindows: Record<AppId, WindowState> = {
  about: { id: "about", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, position: { x: 80, y: 60 } },
  projects: { id: "projects", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, position: { x: 120, y: 90 } },
  guestbook: { id: "guestbook", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, position: { x: 160, y: 120 } },
  terminal: { id: "terminal", isOpen: true, isMinimized: false, isMaximized: false, zIndex: 11, position: { x: 100, y: 80 } },
  contact: { id: "contact", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, position: { x: 200, y: 140 } },
};

export const useOSStore = create<OSStore>((set) => ({
  windows: initialWindows,
  activeWindowId: "terminal",
  maxZIndex: 11,
  openWindow: (id) =>
    set((state) => {
      const nextZ = state.maxZIndex + 1;
      return {
        activeWindowId: id,
        maxZIndex: nextZ,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isOpen: true, isMinimized: false, zIndex: nextZ },
        },
      };
    }),
  closeWindow: (id) =>
    set((state) => ({
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
      windows: { ...state.windows, [id]: { ...state.windows[id], isOpen: false } },
    })),
  minimizeWindow: (id) =>
    set((state) => ({
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
      windows: { ...state.windows, [id]: { ...state.windows[id], isMinimized: true } },
    })),
  focusWindow: (id) =>
    set((state) => {
      if (state.activeWindowId === id && !state.windows[id].isMinimized) return state;
      const nextZ = state.maxZIndex + 1;
      return {
        activeWindowId: id,
        maxZIndex: nextZ,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMinimized: false, zIndex: nextZ },
        },
      };
    }),
  toggleMaximize: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized },
      },
    })),
}));