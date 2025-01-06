import { create } from "zustand";

interface LoadingStateType {
    isLoading: boolean,
    loadingType?: string | null
}

interface LoadingStore {
    loading: LoadingStateType; // A boolean representing the loading state
    setLoading: (value: boolean) => void; // Function to update the loading state
    setLoadingType: (value: string) => void
}

const useLoadingStore = create<LoadingStore>((set) => ({
    loading: {
        isLoading: false,
        loadingType: null
    } , 
    setLoading: (value) => set( (state) => ({ loading: {...state.loading, isLoading: value}})),
    setLoadingType: (value) => set( (state) => ({ loading: {...state.loading, loadingType: value}}))
}));

export default useLoadingStore;
