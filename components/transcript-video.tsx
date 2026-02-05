"use client";

import { Download, Rocket } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import useTranscriptionStore from "@/store/transcription-store";
import useVideoPlaybackStore from "@/store/video-playback-store";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

//@ts-expect-error: Uploading roboto file
import roboto from "@/_fonts/Roboto-Regular.ttf";
//@ts-expect-error: Uploading robotoBold file
import robotoBold from "@/_fonts/Roboto-Bold.ttf";
import { useRouter } from "next/navigation";
import { ToSrt } from "@/lib/toSrt";
import toast from "react-hot-toast";

interface TranscriptVideoProps {
  videoUrl: string;
  fileName: string;
}

const TranscriptVideo = ({ videoUrl, fileName }: TranscriptVideoProps) => {
  const { transcriptions } = useTranscriptionStore();
  const { setCurrentTime, setDuration, setIsPlaying } = useVideoPlaybackStore();

  const [primaryColor, setPrimaryColor] = useState("#FFFFFF");
  const [outlineColor, setOutlineColor] = useState("#000000");
  const [progress, setProgress] = useState(1);
  const [isTranscribed, setIsTranscribed] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const ffmpegRef = useRef(new FFmpeg());

  const router = useRouter();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
    }
    load();
  }, []);

  function toFFmpegColor(rgb: string) {
    const bgr = rgb.slice(5, 7) + rgb.slice(3, 5) + rgb.slice(1, 3);
    return "&H" + bgr + "&";
  }

  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd";
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });
    await ffmpeg.writeFile("/tmp/roboto.ttf", await fetchFile(roboto));
    await ffmpeg.writeFile("/tmp/roboto-bold.ttf", await fetchFile(robotoBold));
  };

  const transcode = async () => {
    router.refresh();
    setIsLoading(true);
    setIsTranscribed(false);
    const ffmpeg = ffmpegRef.current;
    const srt = ToSrt(transcriptions);
    await ffmpeg.writeFile(fileName, await fetchFile(videoUrl));
    await ffmpeg.writeFile("subs.srt", srt);
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
    }
    await new Promise((resolve) => {
      if (videoRef.current) {
        videoRef.current.onloadedmetadata = resolve;
      }
    });
    const duration = videoRef.current?.duration ?? 0;
    ffmpeg.on("log", ({ message }) => {
      const regexResult = /time=([0-9:.]+)/.exec(message);
      if (regexResult && regexResult?.[1]) {
        const howMuchIsDone = regexResult?.[1];
        const [hours, minutes, seconds] = howMuchIsDone.split(":");
        const doneTotalSeconds =
          Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
        const videoProgress = doneTotalSeconds / duration;
        setProgress(videoProgress);
      }
    });
    await ffmpeg.exec([
      "-i",
      fileName,
      "-preset",
      "ultrafast",
      "-vf",
      `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=30,MarginV=50,PrimaryColour=${toFFmpegColor(primaryColor)},OutlineColour=${toFFmpegColor(outlineColor)}'`,
      "output.mp4",
    ]);
    const data = await ffmpeg.readFile("output.mp4");
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );
    }
    toast.success("Adding Caption to Video is succesfull");
    setProgress(1);
    setIsTranscribed(true);
    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-gray-800 bg-gray-900/60 p-4">
            <div className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Caption Styling
            </div>
            <div className="flex items-center justify-between text-sm text-gray-200">
              <span className="font-semibold">Text Primary Color</span>
              <input
                type="color"
                value={primaryColor}
                onChange={(ev) => {
                  setPrimaryColor(ev.target.value);
                }}
                className="h-8 w-12 rounded border border-gray-700 bg-transparent"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-200">
              <span className="font-semibold">Text Outline Color</span>
              <input
                type="color"
                value={outlineColor}
                onChange={(ev) => {
                  setOutlineColor(ev.target.value);
                }}
                className="h-8 w-12 rounded border border-gray-700 bg-transparent"
              />
            </div>
          </div>
          <div className="space-y-3 rounded-2xl border border-gray-800 bg-gray-900/60 p-4">
            <div className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Export
            </div>
            <Button
              disabled={loading}
              onClick={transcode}
              className="w-full font-bold text-lg"
              variant={"destructive"}
            >
              <Rocket />
              Apply Captions
            </Button>
            {isTranscribed && (
              <Button
                onClick={() => {
                  const videoElement = videoRef.current;
                  if (videoElement && videoElement.src) {
                    const anchor = document.createElement("a");
                    anchor.href = videoElement.src;
                    anchor.download = "video.mp4";
                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);
                  } else {
                    toast.error("No video available to download");
                  }
                }}
                className="w-full font-bold text-lg"
              >
                <Download />
                Download Video
              </Button>
            )}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-gray-800 bg-gray-950/50 p-3">
          <video
            ref={videoRef}
            controls
            onTimeUpdate={(event) => {
              setCurrentTime(event.currentTarget.currentTime);
            }}
            onLoadedMetadata={(event) => {
              setDuration(event.currentTarget.duration);
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="aspect-[9/16] w-full rounded-xl object-cover"
          />
          {progress && progress < 1 && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60">
              <div className="flex w-full flex-col items-center gap-y-2 px-6">
                <div className="w-full text-center">Loading ...</div>
                <div className="relative w-full">
                  <div className="h-4 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-sm font-bold text-red-700">
                      {Math.round(progress * 100)}%
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscriptVideo;
