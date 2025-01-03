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
        // ffmpeg.on('log', ({ message }) => {
        //   const regexResult = /time=([0-9:.]+)/.exec(message);
        //   if (regexResult && regexResult?.[1]) {
        //     const howMuchIsDone = regexResult?.[1];
        //     const [hours,minutes,seconds] = howMuchIsDone.split(':');
        //     const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
        //     const videoProgress = doneTotalSeconds / duration;
        //     setProgress(videoProgress);
        //   }
        // });
        await ffmpeg.exec([
          '-i', fileName,
          '-preset', 'ultrafast',
          '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=30,MarginV=50,PrimaryColour=${toFFmpegColor(primaryColor)},OutlineColour=${toFFmpegColor(outlineColor)}'`,
          'output.mp4'
        ]);
        const data = await ffmpeg.readFile('output.mp4');
        videoRef.current.src = URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
        toast.error("adad")
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
                {
                    transcribing ? (
                        <div>

                        </div>
                    ) : (
                        <div>
                            
                        </div>
                    )
                }
                <video
                    ref={videoRef}
                    controls
                    style={{ width: "240px", height: "426px" }}
                    className="rounded-lg"
                /> 
                <Button onClick={transcode} className="font-bold text-lg" variant={'destructive'}>
                    <Rocket />
                    Apply Captions
                </Button>
            </div>
              {/* <div className="h-[426px] w-[240px]">
                <div role="status" className="h-full w-full flex justify-center items-center bg-slate-300/20 rounded-lg">
                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div> */}
            </div> 
     );
}
 
export default TranscriptVideo;