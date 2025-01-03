import { getTranscription } from "@/actions/getTranscritpion";
import { getVideoDetails } from "@/actions/getVideoDetails";
import { getVideoSignedUrl } from "@/actions/getVideoSignedUrl";
import TranscriptVideo from "@/components/transcript-video";
import TranscriptionTable from "@/components/transcription-table";

const VideoIdPage = async ({
  params,
}: {
  params: Promise<{
    videoId: string;
  }>
}) => {
  
  
  const videoId =  (await params).videoId


  if (!videoId) {
    return <div>Error: Video ID is missing!</div>;
  }

  try {

    const videoDetails = await getVideoDetails(videoId);
    if (!videoDetails) {
      return <div>Error: Video details not found!</div>;
    }

    const videoUrl = await getVideoSignedUrl(videoDetails.fileName);

    const transcriptionResponse = await getTranscription(videoDetails.fileName,videoDetails.user.email)
    if(transcriptionResponse){
      
    }
    
    if (!videoUrl) {
      return <div>Error: Unable to generate signed URL for the video.</div>;
    }

    return (
      <div className="h-full w-full overflow-y-scroll">
        <div className="grid grid-cols-3 w-full h-full">
          <div className="col-span-3 md:col-span-2 h-full w-full order-last md:order-first ">
            <div className="w-full h-full p-5">
              <div className="w-full text-center text-3xl font-extrabold ">Transctiptions</div>
              <TranscriptionTable 
                transcriptiondata = {transcriptionResponse}
              />
            </div>
          </div>
          <div className="col-span-3 md:col-span-1 h-full w-full order-first md:order-none ">
            <TranscriptVideo
              videoUrl={videoUrl}
              fileName = {videoDetails.fileName}
            />     
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading video:", error);
    return <div>Error: Unable to load video.</div>;
  }
};

export default VideoIdPage;