import { getTranscription } from "@/actions/getTranscritpion";
import { getVideoDetails } from "@/actions/getVideoDetails";
import { getVideoSignedUrl } from "@/actions/getVideoSignedUrl";
import TranscriptVideo from "@/components/transcript-video";
import TranscriptionTable from "@/components/transcription-table";
import TranscriptionTimeline from "@/components/transcription-timeline";
import { normalizeTranscriptions } from "@/lib/normalize-transcriptions";

const VideoIdPage = async ({
  params,
}: {
  params: Promise<{
    videoId: string;
  }>;
}) => {
  const videoId = (await params).videoId;

  if (!videoId) {
    return <div>Error: Video ID is missing!</div>;
  }

  try {
    const videoDetails = await getVideoDetails(videoId);
    if (!videoDetails) {
      return <div>Error: Video details not found!</div>;
    }

    const videoUrl = await getVideoSignedUrl(videoDetails.fileName);

    const transcriptionResponse = await getTranscription(
      videoDetails.fileName,
      videoDetails.user.email
    );
    const normalizedTranscriptions = normalizeTranscriptions(transcriptionResponse);
    if (!videoUrl) {
      return <div>Error: Unable to generate signed URL for the video.</div>;
    }

    return (
      <div className="min-h-screen w-full bg-gray-900 text-gray-100">
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:px-8">
          <div className="rounded-3xl border border-gray-800 bg-gray-950/40 p-6 shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.4em] text-gray-500">
                    Preview
                  </div>
                  <h1 className="text-2xl font-semibold text-white">
                    Captioned Video
                  </h1>
                </div>
                <div className="rounded-full border border-gray-700 bg-gray-900 px-4 py-2 text-xs text-gray-300">
                  Live playback sync
                </div>
              </div>
              <TranscriptVideo
                videoUrl={videoUrl}
                fileName={videoDetails.fileName}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-950/60 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
              <div>
                <div className="text-xs uppercase tracking-[0.4em] text-gray-500">
                  Timeline
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Caption Editor
                </h2>
              </div>
              <div className="text-xs text-gray-400">
                Playhead moves with the video
              </div>
            </div>
            <TranscriptionTimeline />
            <div className="max-h-[45vh] overflow-y-auto px-6 pb-6">
              <TranscriptionTable transcriptiondata={normalizedTranscriptions} />
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
