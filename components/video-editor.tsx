"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import useTranscriptionStore from "@/store/transcription-store";

interface Transcription {
  start_time: string;
  end_time: string;
  content: string;
}

const PX_PER_SECOND = 80;
const ROW_HEIGHT = 32;

/* ================= UTILS ================= */
const formatTime = (t: string | number) => {
  const sec = Number(t);
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export default function VideoEditor({
  videoUrl,
  transcriptiondata,
}: {
  videoUrl: string;
  transcriptiondata: Transcription[];
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const isUserScrolling = useRef(false);

  const { transcriptions, setTranscriptions } =
    useTranscriptionStore();

  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  /* ================= INIT STORE ================= */
  useEffect(() => {
    if (!Array.isArray(transcriptiondata)) return;

    const clean = transcriptiondata.filter(
      (c): c is Transcription =>
        !!c &&
        typeof c.start_time === "string" &&
        typeof c.end_time === "string"
    );

    setTranscriptions(clean);
  }, [transcriptiondata, setTranscriptions]);

  /* ================= SAFE DATA ================= */
  const safeTranscriptions = useMemo(
    () =>
      (transcriptions ?? []).filter(
        (c): c is Transcription =>
          !!c &&
          typeof c.start_time === "string" &&
          typeof c.end_time === "string"
      ),
    [transcriptions]
  );

  /* ================= VIDEO SYNC ================= */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || safeTranscriptions.length === 0)
      return;

    const onTime = () => {
      const t = video.currentTime;
      setCurrentTime(t);

      const idx = safeTranscriptions.findIndex(
        (c) =>
          t >= Number(c.start_time) &&
          t <= Number(c.end_time)
      );

      if (idx !== -1) setActiveIndex(idx);
    };

    const onLoad = () => {
      if (!isNaN(video.duration))
        setDuration(video.duration);
    };

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onLoad);

    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onLoad);
    };
  }, [safeTranscriptions]);

  /* ================= AUTO SCROLL (X + Y) ================= */
  useEffect(() => {
    const el = timelineRef.current;
    if (!el || isUserScrolling.current) return;

    const targetX =
      currentTime * PX_PER_SECOND -
      el.clientWidth / 2;

    const targetY =
      activeIndex !== null
        ? activeIndex * ROW_HEIGHT -
          el.clientHeight / 2
        : 0;

    el.scrollTo({
      left: Math.max(0, targetX),
      top: Math.max(0, targetY),
      behavior: "smooth",
    });
  }, [currentTime, activeIndex]);

  /* ================= SCROLL SYNC (LEFT ↔ GRID) ================= */
  useEffect(() => {
    const grid = timelineRef.current;
    const left = leftPanelRef.current;
    if (!grid || !left) return;

    const onGridScroll = () => {
      left.scrollTop = grid.scrollTop;
    };

    const onLeftScroll = () => {
      grid.scrollTop = left.scrollTop;
    };

    grid.addEventListener("scroll", onGridScroll);
    left.addEventListener("scroll", onLeftScroll);

    return () => {
      grid.removeEventListener("scroll", onGridScroll);
      left.removeEventListener("scroll", onLeftScroll);
    };
  }, []);

  /* ================= SPACE BAR ================= */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", onKey);
    return () =>
      window.removeEventListener("keydown", onKey);
  }, []);

  /* ================= ACTIONS ================= */
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  };

  const seek = (t: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = t;
  };

  const updateCaption = (value: string) => {
    if (activeIndex === null) return;

    const next = [...safeTranscriptions];
    if (!next[activeIndex]) return;

    next[activeIndex] = {
      ...next[activeIndex],
      content: value,
    };

    setTranscriptions(next);
  };

  const selectedCaption =
    activeIndex !== null
      ? safeTranscriptions[activeIndex]
      : null;

  /* ================= UI ================= */
  return (
    <div className="h-full w-full bg-neutral-950 text-white flex flex-col scroll-auto">

      {/* VIDEO */}
      <div className="flex justify-center w-full py-1.5 bg-neutral-900 border-b border-neutral-800">
        <div className="aspect-[9/16]  max-w-[320px] max-h-[420px] bg-black rounded-md overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            controls
          />
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex w-full items-center gap-4 px-5 py-2 bg-neutral-900 border-b border-neutral-800 text-sm">
        <div className="flex justify-between gap-x-3 w-full">
         <div className="flex gap-x-3 flex-row items-center">
           <button
            onClick={togglePlay}
            className="px-3 py-1 bg-white text-black rounded"
          >
            ▶︎ / ❚❚ (Space)
          </button>
          <span className="text-neutral-400">
            {currentTime.toFixed(2)} /{" "}
            {duration.toFixed(2)}
          </span>
         </div>
         <div className="">
          a
         </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* LEFT PANEL (SCROLLS WITH GRID) */}
        <div
          ref={leftPanelRef}
          className="w-52 bg-neutral-900 border-r border-neutral-800 overflow-y-auto"
        >
          <div className="px-3 py-2 text-xs text-neutral-400 uppercase sticky top-0 bg-neutral-900 z-10">
            Captions
          </div>

          {safeTranscriptions.map((cap, i) => (
            <div
              key={i}
              className={`h-[32px] px-3 flex items-center text-xs border-t border-neutral-800 ${
                i === activeIndex ? "bg-neutral-800" : ""
              }`}
            >
              <span className="text-neutral-300">
                {formatTime(cap.start_time)}
              </span>
              <span className="mx-1 text-neutral-600">–</span>
              <span className="text-neutral-400">
                {formatTime(cap.end_time)}
              </span>
            </div>
          ))}
        </div>

        {/* GRID */}
        <div
          ref={timelineRef}
          className="flex-1 overflow-auto bg-neutral-950 relative"
        >
          <div
            className="relative"
            style={{
              width: duration * PX_PER_SECOND,
              height:
                safeTranscriptions.length *
                ROW_HEIGHT,
            }}
          >
            {/* ROW LINES */}
            {safeTranscriptions.map((_, i) => (
              <div
                key={`line-${i}`}
                className="absolute left-0 right-0 border-t border-neutral-800"
                style={{ top: i * ROW_HEIGHT }}
              />
            ))}

            {/* PLAYHEAD */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white z-20"
              style={{
                left: currentTime * PX_PER_SECOND,
              }}
            />

            {/* BLOCKS */}
            {safeTranscriptions.map((cap, i) => {
              const start = Number(cap.start_time);
              const end = Number(cap.end_time);

              return (
                <div
                  key={i}
                  onClick={() => {
                    setActiveIndex(i);
                    seek(start);
                  }}
                  className={`absolute h-[24px] px-2 rounded text-[11px] flex items-center cursor-pointer z-10 ${
                    i === activeIndex
                      ? "bg-indigo-500 text-white"
                      : "bg-neutral-800 text-neutral-300"
                  }`}
                  style={{
                    top: i * ROW_HEIGHT + 4,
                    left: start * PX_PER_SECOND,
                    width: Math.max(
                      (end - start) *
                        PX_PER_SECOND,
                      60
                    ),
                  }}
                >
                  <span className="truncate">
                    {cap.content}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* INSPECTOR (COMPACT) */}
      <div className="h-20 bg-neutral-900 border-t border-neutral-800 px-5 py-2">
        <div className="text-xs uppercase text-neutral-400 mb-1">
          Caption Inspector
        </div>

        {selectedCaption ? (
          <textarea
            value={selectedCaption.content}
            onChange={(e) =>
              updateCaption(e.target.value)
            }
            className="w-full h-12 bg-neutral-800 rounded px-3 py-2 text-sm outline-none resize-none"
          />
        ) : (
          <div className="text-sm text-neutral-500">
            Click a caption block to edit text
          </div>
        )}
      </div>
    </div>
  );
}
