import { create } from "zustand";

interface VideoPlaybackStore {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  setCurrentTime: (currentTime: number) => void;
  setDuration: (duration: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const useVideoPlaybackStore = create<VideoPlaybackStore>((set) => ({
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));

export default useVideoPlaybackStore;
