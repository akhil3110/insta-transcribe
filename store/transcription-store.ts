import { create } from "zustand";

export interface TranscriptionType {
  start_time: string;
  end_time: string;
  content: string;
}

interface TranscriptionStore {
  transcriptions: TranscriptionType[];
  setTranscriptions: (transcriptions: TranscriptionType[]) => void;
}

const useTranscriptionStore = create<TranscriptionStore>((set) => ({
  transcriptions: [],
  setTranscriptions: (transcriptions) => set({ transcriptions }),
}));

export default useTranscriptionStore;
