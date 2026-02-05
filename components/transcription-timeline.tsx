"use client";

import useVideoPlaybackStore from "@/store/video-playback-store";

const formatTime = (value: number) => {
  if (!Number.isFinite(value)) {
    return "00:00";
  }
  const minutes = Math.floor(value / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const TranscriptionTimeline = () => {
  const { currentTime, duration, isPlaying } = useVideoPlaybackStore();
  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-gray-500">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="relative mt-3 h-3 w-full rounded-full bg-gray-800">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]"
          style={{ left: `calc(${progress * 100}% - 8px)` }}
        />
      </div>
      <div className="mt-3 text-xs text-gray-400">
        {isPlaying ? "Playing" : "Paused"} • Playhead stays synced to the video.
      </div>
    </div>
  );
};

export default TranscriptionTimeline;
