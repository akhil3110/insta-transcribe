import { create } from 'zustand';

// State types
interface TranscriptionStateType {
    start_time: string;
    end_time: string;
    content: string;
}

// useCounterStore
export const useTranscriptionStore = create(() => ({
    transcriptionState: [],

    setTranscription : (transcriptions: TranscriptionStateType[]) => set((state) => ({}))
}));