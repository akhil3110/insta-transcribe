import { TranscriptionType } from "@/store/transcription-store";

type UnknownTranscription = Partial<TranscriptionType> & {
  start?: string | number;
  end?: string | number;
  text?: string;
};

const isValidTranscription = (item: UnknownTranscription): item is TranscriptionType => {
  return (
    typeof item.start_time === "string" &&
    typeof item.end_time === "string" &&
    typeof item.content === "string"
  );
};

const toTranscription = (item: UnknownTranscription): TranscriptionType | null => {
  if (isValidTranscription(item)) {
    return item;
  }

  const start = item.start_time ?? item.start;
  const end = item.end_time ?? item.end;
  const content = item.content ?? item.text;

  if (start === undefined || end === undefined || content === undefined) {
    return null;
  }

  return {
    start_time: String(start),
    end_time: String(end),
    content: String(content),
  };
};

export const normalizeTranscriptions = (input: unknown): TranscriptionType[] => {
  const items: UnknownTranscription[] = Array.isArray(input)
    ? input.filter(Boolean)
    : typeof input === "object" && input !== null
      ? Object.entries(input)
          .filter(([key, value]) => key !== "length" && value)
          .sort(([left], [right]) => Number(left) - Number(right))
          .map(([, value]) => (value as UnknownTranscription))
      : [];

  return items
    .map(toTranscription)
    .filter((item): item is TranscriptionType => item !== null)
    .sort((left, right) => Number(left.start_time) - Number(right.start_time));
};
