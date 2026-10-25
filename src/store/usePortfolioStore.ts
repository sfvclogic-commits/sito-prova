import { create } from 'zustand';

export type ViewState = 'desk' | 'work' | 'about' | 'contact';

interface PortfolioState {
  view: ViewState;
  selectedObject: string | null;
  setView: (view: ViewState) => void;
  setSelectedObject: (obj: string | null) => void;
  // Lamp State
  lampOn: boolean;
  lampRotation: number;
  setLampOn: (on: boolean) => void;
  setLampRotation: (rot: number) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  view: 'desk',
  selectedObject: null,
  setView: (view) => set({ view }),
  setSelectedObject: (obj) => set({ selectedObject: obj }),
  // Lamp State
  lampOn: true,
  lampRotation: 0,
  setLampOn: (on) => set({ lampOn: on }),
  setLampRotation: (rot) => set({ lampRotation: rot }),
}));
