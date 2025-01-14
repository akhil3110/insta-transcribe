import useModalStore from "@/store/modal-store";
import { File, Play, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface VideoDetailsCardTypes {
    id: string;
    fileName: string;
    createdAt: Date;
}

const VideoDetailsCard = ({ id, fileName, createdAt }: VideoDetailsCardTypes) => {
    const shortFileName = fileName.split(".")[0];
    const router = useRouter();

    const {onOpen} = useModalStore()

    return (
        <div
            className="p-4 bg-gray-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer hover:bg-gray-700 relative"
            onClick={() => { router.push(`/videos/${id}`); }}
        >
            {/* Video Thumbnail */}
            <div className="relative mb-4">
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                    <Play className="text-white" size={36} />
                </div>
                <div className="w-full h-48 bg-gray-600 rounded-lg"></div> {/* Placeholder for video thumbnail */}
            </div>

            {/* File Information */}
            <div className="flex items-center gap-3 mb-3">
                <File className="text-white" size={28} />
                <div className="text-lg font-semibold text-white truncate overflow-x-hidden">{shortFileName}</div>
            </div>
            
            {/* Uploaded Date */}
            <div className="text-sm text-gray-400 flex justify-between">
                <div>Uploaded on: {new Date(createdAt).toLocaleDateString()}</div>
                <div
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent event from bubbling up
                        onOpen("delete-video", { videoId: id, fileName }); 
                    }}
                    className="hover:text-white rounded-full"
                >
                    <Trash className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
};

export default VideoDetailsCard;
