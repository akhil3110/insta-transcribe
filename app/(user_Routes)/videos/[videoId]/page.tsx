import { getTranscription } from "@/actions/getTranscritpion";
import { getVideoDetails } from "@/actions/getVideoDetails";
import { getVideoSignedUrl } from "@/actions/getVideoSignedUrl";
import OldVersionPopup from "@/components/old-versoin-popup";
import VideoEditor from "@/components/video-editor";


const VideoIdPage = async ({
  params,
}: {
  params: { videoId: string };
}) => {
  const videoId = params.videoId;

  if (!videoId) {
    return <div>Error: Video ID is missing!</div>;
  }

  const videoDetails = await getVideoDetails(videoId);
  if (!videoDetails) {
    return <div>Error: Video details not found!</div>;
  }

  const videoUrl = await getVideoSignedUrl(videoDetails.fileName);
  if (!videoUrl) {
    return <div>Error: Unable to generate signed URL for the video.</div>;
  }

  const transcriptionResponse = await getTranscription(
    videoDetails.fileName,
    videoDetails.user.email
  );

  return (
    <>
      <OldVersionPopup videoId={videoId} />
      <VideoEditor
        videoUrl={videoUrl}
        transcriptiondata={transcriptionResponse ?? []}
        filename= {videoDetails.fileName}
      />
    </>
  );
};

export default VideoIdPage;
