"use client";

import useVideoPlaybackStore from "@/store/video-playback-store";
import useTranscriptionStore from "@/store/transcription-store";

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
  const { transcriptions } = useTranscriptionStore();
  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  return (
    <div className="space-y-4 px-6 py-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-gray-500">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="relative h-3 w-full rounded-full bg-gray-800">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]"
          style={{ left: `calc(${progress * 100}% - 8px)` }}
        />
      </div>

      <div className="relative h-10 w-full overflow-hidden rounded-md border border-gray-800 bg-gray-900/60">
        {transcriptions.map((item, index) => {
          const start = Number(item.start_time);
          const end = Number(item.end_time);
          const left = duration > 0 ? (start / duration) * 100 : 0;
          const width = duration > 0 ? ((end - start) / duration) * 100 : 0;
          const isActive = currentTime >= start && currentTime <= end;

          return (
            <div
              key={`${item.start_time}-${index}`}
              className={`absolute top-1 h-8 rounded-sm border px-1 text-[10px] leading-6 text-white/90 ${
                isActive
                  ? "border-cyan-300 bg-cyan-500/60"
                  : "border-blue-400/40 bg-blue-500/30"
              }`}
              style={{ left: `${left}%`, width: `${Math.max(width, 1.2)}%` }}
              title={item.content}
            >
              <span className="line-clamp-1">{item.content}</span>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-gray-400">
        {isPlaying ? "Playing" : "Paused"} • Playhead and captions stay synced.
      </div>
    </div>
  );
};

export default TranscriptionTimeline;
