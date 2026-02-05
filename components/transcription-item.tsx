import { ChangeEvent } from "react";
import { TranscriptionType } from "@/store/transcription-store";

interface TranscriptionItemProps {
  item: TranscriptionType;
  isActive: boolean;
  activeRef?: (node: HTMLDivElement | null) => void;
  handleContentChange: (ev: ChangeEvent<HTMLInputElement>) => void;
}

const TranscriptionItem = ({
  item,
  isActive,
  activeRef,
  handleContentChange,
}: TranscriptionItemProps) => {
  return (
    <>
      <div
        ref={activeRef}
        className={`col-span-1 rounded-md border py-2 px-4 text-center shadow-sm transition ${
          isActive
            ? "border-cyan-400 bg-cyan-500/20 text-cyan-100"
            : "border-gray-600 bg-gray-800 text-gray-200"
        }`}
      >
        {item.start_time}
      </div>
      <div
        className={`col-span-1 rounded-md border py-2 px-4 text-center shadow-sm transition ${
          isActive
            ? "border-cyan-400 bg-cyan-500/20 text-cyan-100"
            : "border-gray-600 bg-gray-800 text-gray-200"
        }`}
      >
        {item.end_time}
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <input
          className={`w-full rounded-lg border py-2 px-4 text-center shadow-md outline-none transition-all placeholder-gray-400 ${
            isActive
              ? "border-cyan-400 bg-cyan-900/30 text-cyan-50 ring-2 ring-cyan-500/40"
              : "border-gray-500 bg-gray-700 text-gray-200 focus:border-blue-500 focus:bg-gray-800 focus:ring-2 focus:ring-blue-400"
          }`}
          value={item.content}
          onChange={handleContentChange}
          placeholder="Edit caption..."
        />
      </div>
    </>
  );
};

export default TranscriptionItem;
