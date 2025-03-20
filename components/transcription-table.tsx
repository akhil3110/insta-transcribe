"use client";

import { useEffect } from "react";
import TranscriptionItem from "./transcription-item";
import useTranscriptionStore from "@/store/transcription-store";
import useLoadingStore from "@/store/loading-store";

interface TranscriptionTableProps {
  transcriptiondata: {
    start_time: string;
    end_time: string;
    content: string;
  }[];
}

const TranscriptionTable = ({ transcriptiondata }: TranscriptionTableProps) => {
  const { transcriptions, setTranscriptions } = useTranscriptionStore();
  const {setLoading, setLoadingType} = useLoadingStore()

  useEffect(() => {
    setLoading(false);
    setLoadingType("Loading")
    setTranscriptions(transcriptiondata);
  }, []);

  //@ts-expect-error: type event
  const updateTranscription = (index: number, property: string, ev) => {
    const newTranscription = [...transcriptions];
    //@ts-expect-error: event error
    newTranscription[index][property] = ev.target.value;
    setTranscriptions(newTranscription);
  };

  return (
    <>
      <div className="w-full sticky top-0 grid grid-cols-3 bg-gray-900 text-gray-200 rounded-md p-4 text-base md:text-lg font-bol shadow-md border-b border-t border-l border-r border-gray-600">
        {/* Start Time */}
        <div className="col-span-1 text-center text-sm md:text-base">Start Time</div>

        {/* End Time */}
        <div className="col-span-1 text-center text-sm md:text-base">End Time</div>

        {/* Caption */}
        <div className="col-span-1  
         text-center text-sm md:text-base">
          Caption
          <div className="ml-2 text-xs text-gray-400 italic">(editable)</div>
        </div>
      </div>

      <div className="w-full bg-gray-800 grid grid-cols-3 gap-4 p-4 rounded-md shadow-sm">
        {transcriptions && transcriptions.length > 0 &&
          transcriptions.map((item, key) => (
            <TranscriptionItem
              key={key}
              item={item}
              handleContentChange={(ev) =>
                updateTranscription(key, "content", ev)
              }
            />
          ))}
      </div>
    </>
  );
};

export default TranscriptionTable;