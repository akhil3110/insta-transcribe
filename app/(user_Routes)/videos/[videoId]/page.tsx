import { getVideoDetails } from "@/actions/getVideoDetails";
import { getVideoSignedUrl } from "@/actions/getVideoSignedUrl";

const VideoIdPage = async ({
  params,
}: {
  params: {
    videoId: string;
  };
}) => {
  

  if (!params?.videoId) {
    return <div>Error: Video ID is missing!</div>;
  }

  try {
    // Fetch video details
    const videoDetails = await getVideoDetails(params.videoId);
    if (!videoDetails) {
      return <div>Error: Video details not found!</div>;
    }

    // Fetch signed URL for the video file
    const videoUrl = await getVideoSignedUrl(videoDetails.fileName);
    if (!videoUrl) {
      return <div>Error: Unable to generate signed URL for the video.</div>;
    }

    return (
      <div className="h-full w-full">
        <div className="grid grid-cols-3 w-full h-full">
          <div className="cols-span-3 md:col-span-2 order-last md:order-none">
            adad
          </div>
          <div className="col-span-3 md:col-span-1 h-full w-full order-first md:order-none">
            <div className="h-full w-full flex justify-center items-center bg-red-700">
              <video
                src={videoUrl}
                controls
                style={{ width: "240px", height: "426px" }}
              />
            </div>      
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