"use client";

import { useEffect, useMemo, useRef } from "react";
import TranscriptionItem from "./transcription-item";
import useTranscriptionStore, { TranscriptionType } from "@/store/transcription-store";
import useLoadingStore from "@/store/loading-store";
import useVideoPlaybackStore from "@/store/video-playback-store";

interface TranscriptionTableProps {
  transcriptiondata: TranscriptionType[];
}

const TranscriptionTable = ({ transcriptiondata }: TranscriptionTableProps) => {
  const { transcriptions, setTranscriptions } = useTranscriptionStore();
  const { setLoading, setLoadingType } = useLoadingStore();
  const { currentTime } = useVideoPlaybackStore();
  const activeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLoading(false);
    setLoadingType("Loading");
    setTranscriptions(transcriptiondata);
  }, [setLoading, setLoadingType, setTranscriptions, transcriptiondata]);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentTime]);

  const activeIndex = useMemo(() => {
    return transcriptions.findIndex((item) => {
      const start = Number(item.start_time);
      const end = Number(item.end_time);
      return Number.isFinite(start) && Number.isFinite(end) && currentTime >= start && currentTime <= end;
    });
  }, [currentTime, transcriptions]);

  const updateTranscription = (
    index: number,
    property: keyof TranscriptionType,
    value: string
  ) => {
    const newTranscription = [...transcriptions];
    newTranscription[index] = {
      ...newTranscription[index],
      [property]: value,
    };
    setTranscriptions(newTranscription);
  };

  return (
    <>
      <div className="sticky top-0 z-10 grid w-full grid-cols-3 rounded-md border border-gray-600 bg-gray-900 p-4 text-base text-gray-200 shadow-md md:text-lg">
        <div className="col-span-1 text-center text-sm md:text-base">Start Time</div>
        <div className="col-span-1 text-center text-sm md:text-base">End Time</div>
        <div className="col-span-1 text-center text-sm md:text-base">
          Caption
          <div className="ml-2 text-xs italic text-gray-400">(editable)</div>
        </div>
      </div>

      <div className="grid w-full grid-cols-3 gap-4 rounded-md bg-gray-800 p-4 shadow-sm">
        {transcriptions.map((item, index) => (
          <TranscriptionItem
            key={`${item.start_time}-${index}`}
            item={item}
            isActive={index === activeIndex}
            activeRef={index === activeIndex ? (node) => { activeRef.current = node; } : undefined}
            handleContentChange={(ev) =>
              updateTranscription(index, "content", ev.target.value)
            }
          />
        ))}
      </div>
    </>
  );
};

export default TranscriptionTable;
