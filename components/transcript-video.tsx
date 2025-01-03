//@ts-nocheck

"use client"
import { Rocket } from "lucide-react";
import { Button } from "./ui/button";
import { use, useEffect, useRef, useState } from "react";
import useTranscriptionStore from "@/store/transcription-store";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile,toBlobURL } from '@ffmpeg/util';

//@ts-ignore
import roboto from "@/_fonts/Roboto-Regular.ttf"
//@ts-ignore
import robotoBold from "@/_fonts/Roboto-Bold.ttf"
import { useRouter } from "next/navigation";
import { ToSrt } from "@/lib/toSrt";
import toast from "react-hot-toast";

interface TranscriptVideoProps{
    videoUrl: string
    fileName: string
}

const TranscriptVideo = ({
    videoUrl,
    fileName
}: TranscriptVideoProps) => {

    const { transcriptions, setTranscriptions } = useTranscriptionStore();

    const [primaryColor,setPrimaryColor] = useState('#FFFFFF')
    const [outlineColor,setOutlineColor] = useState('#000000')
    const [loaded, setLoaded] = useState(false);
    const [transcribing,setTranscribing] = useState(false)
    const [progress, setProgress] = useState(1);
    
    const videoRef = useRef<any>(null)
    const ffmpegRef = useRef(new FFmpeg());

    const router = useRouter()

    useEffect(() =>{
        videoRef.current.src = videoUrl;
        load()
    },[])
    
    function toFFmpegColor(rgb: string) {
        const bgr = rgb.slice(5,7) + rgb.slice(3,5) + rgb.slice(1,3);
        return '&H' + bgr + '&';
    }

    const load = async () => {
        const ffmpeg = ffmpegRef.current;
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd'
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
        await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
        setLoaded(true);
    }

    const transcode = async () => {
        toast.success("adad")
        router.refresh();
        const ffmpeg = ffmpegRef.current;
        const srt = ToSrt(transcriptions);
        await ffmpeg.writeFile(fileName, await fetchFile(videoUrl));
        await ffmpeg.writeFile('subs.srt', srt);
        videoRef.current.src = videoUrl;
        await new Promise((resolve, reject) => {
          videoRef.current.onloadedmetadata = resolve;
        });
        const duration = videoRef.current.duration;
        ffmpeg.on('log', ({ message }) => {
          const regexResult = /time=([0-9:.]+)/.exec(message);
          if (regexResult && regexResult?.[1]) {
            const howMuchIsDone = regexResult?.[1];
            const [hours,minutes,seconds] = howMuchIsDone.split(':');
            const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
            const videoProgress = doneTotalSeconds / duration;
            setProgress(videoProgress);
          }
        });
        await ffmpeg.exec([
          '-i', fileName,
          '-preset', 'ultrafast',
          '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=30,MarginV=50,PrimaryColour=${toFFmpegColor(primaryColor)},OutlineColour=${toFFmpegColor(outlineColor)}'`,
          'output.mp4'
        ]);
        const data = await ffmpeg.readFile('output.mp4');
        videoRef.current.src = URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
        toast.error("adad")
        setProgress(1)
      }

    

    return ( 
        <div className="h-screen w-full flex justify-center items-center sticky top-6">
            <div className="flex flex-col gap-y-4">
            <div>
                <div className="flex justify-around">
                    <div className="font-bold">
                        Text Primary color:
                    </div>
                    <div>
                        <input type="color"
                            value={primaryColor}
                            onChange={ev => setPrimaryColor(ev.target.value)}
                            className=" bg-transparent"
                        />
                    </div>
                </div>
                <div className="flex justify-around">
                    <div className="font-bold">
                        Text Outline color:
                    </div>
                    <div>
                        <input type="color"
                            value={outlineColor}
                            onChange={ev => setOutlineColor(ev.target.value)}
                            className=" bg-transparent"
                        />
                    </div>
                </div>
            </div>
            <div className="relative" style={{ width: "240px", height: "426px" }}>
                <video
                    ref={videoRef}
                    controls
                    style={{ width: "100%", height: "100%" }}
                    className="rounded-lg"
                />
                {progress && progress < 1 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
                        <div className="flex flex-col gap-y-2 w-full items-center">
                        <div className="w-full text-center">
                            Loading ...
                        </div>
                        <div className="relative w-[80%]">
                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
                                    style={{ width: `${progress * 100}%` }}
                                />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-red-700 text-sm font-bold">{Math.round(progress * 100)}%</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                )}
            </div>

            <Button onClick={transcode} className="font-bold text-lg" variant={'destructive'}>
                <Rocket />
                Apply Captions
            </Button>
        </div>     
    </div> 
    );
}
 
export default TranscriptVideo;