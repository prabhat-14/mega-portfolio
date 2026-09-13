import { create } from "zustand";

interface AppWindow {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface OSState {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  windows: Record<string, AppWindow>;
  activeWindowId: string | null;
  toggleWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useOSStore = create<OSState>((set) => ({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
  
  windows: {
    terminal: { id: "terminal", title: "Terminal", isOpen: false, isMinimized: false, zIndex: 1 },
    about: { id: "about", title: "About Me", isOpen: true, isMinimized: false, zIndex: 2 },
    projects: { id: "projects", title: "Projects", isOpen: false, isMinimized: false, zIndex: 1 },
    guestbook: { id: "guestbook", title: "Guestbook", isOpen: false, isMinimized: false, zIndex: 1 },
    contact: { id: "contact", title: "Contact", isOpen: false, isMinimized: false, zIndex: 1 },
  },
  activeWindowId: "about",

  toggleWindow: (id: string) =>
    set((state) => {
      const target = state.windows[id];
      if (!target) return state;

      const highestZ = Math.max(...Object.values(state.windows).map((w) => w.zIndex), 1);

      return {
        activeWindowId: id,
        windows: {
          ...state.windows,
          [id]: {
            ...target,
            isOpen: true,
            isMinimized: false,
            zIndex: highestZ + 1,
          },
        },
      };
    }),

  minimizeWindow: (id: string) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true },
      },
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

  closeWindow: (id: string) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: false, isMinimized: false },
      },
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

  focusWindow: (id: string) =>
    set((state) => {
      const highestZ = Math.max(...Object.values(state.windows).map((w) => w.zIndex), 1);
      return {
        activeWindowId: id,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMinimized: false, zIndex: highestZ + 1 },
        },
      };
    }),
}));