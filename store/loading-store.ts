import { create } from "zustand";

interface LoadingStore {
    loading: boolean; // A boolean representing the loading state
    setLoading: (value: boolean) => void; // Function to update the loading state
}

const useLoadingStore = create<LoadingStore>((set) => ({
    loading: false,
    setLoading: (value) => set({ loading: value }), // Update the loading state
}));

export default useLoadingStore;
