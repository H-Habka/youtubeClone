import create from "zustand";

export const store = create((set) => ({
  category: "New",
  setCategory: (category) => set((state) => ({ ...state, category })),
}));
