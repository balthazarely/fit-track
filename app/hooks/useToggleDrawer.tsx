import { create } from "zustand";

interface ToggleDrawerStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useToggleDrawer = create<ToggleDrawerStore>((set: any) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useToggleDrawer;
