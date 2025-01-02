"use client";

import { useState, useEffect } from "react";
import TranscriptionItem from "./transcription-item";

interface TranscriptionTableProps {
  transcriptiondata: {
    start_time: string;
    end_time: string;
    content: string;
  }[];
}

const TranscriptionTable = ({ transcriptiondata }: TranscriptionTableProps) => {
  // Explicitly define the type of the state
  const [transcription, setTranscription] = useState<
    { start_time: string; end_time: string; content: string }[]
  >([]);

  useEffect(() => {
    setTranscription(transcriptiondata);
  }, [transcriptiondata]); // Add dependency for proper updates

  return (
    <>
      <div className="w-full grid grid-cols-3 border-white/50 bg-violet-500 rounded-md p-2 text-xl font-semibold">
        <div className="col-span-1 text-center">Start</div>
        <div className="col-span-1 text-center">End</div>
        <div className="col-span-1 text-center">Content</div>
      </div>
      <div className="w-full bg-blue-900 grid grid-cols-3">
        {transcription.length > 0 &&
          transcription.map((item, key) => (
            <TranscriptionItem key={key} item={item} />
          ))}
      </div>
    </>
  );
};

export default TranscriptionTable;
