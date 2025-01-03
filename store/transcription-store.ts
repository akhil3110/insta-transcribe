import { create } from "zustand";

interface TranscriptionType {
    start_time: string;
    end_time: string;
    content: string;
}

interface TranscriptionStore {
    transcriptions: TranscriptionType[]; // Array of transcription objects
    setTranscriptions: (transcriptions: TranscriptionType[]) => void; // Function to set the array
}

const useTranscriptionStore = create<TranscriptionStore>((set) => ({
    transcriptions: [],
    setTranscriptions: (transcriptions) => set({ transcriptions }), // Update the array
}));

export default useTranscriptionStore;
