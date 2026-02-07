import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useModalStore from "@/store/modal-store";
import { MoreVertical, Play, Trash, Video } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  fileName: string;
  createdAt: Date;
}

export default function VideoDetailsCard({ id, fileName, createdAt }: Props) {
  const router = useRouter();
  const { onOpen } = useModalStore();
  const shortFileName = fileName.split(".")[0];

  const title = fileName.replace(/\.[^/.]+$/, "");

  return (
    <Card
      onClick={() => router.push(`/videos/${id}`)}
      className="
        group cursor-pointer overflow-hidden
        bg-[#111827] border border-[#1f2937]
        transition-all duration-200
        hover:bg-[#161f2e] hover:shadow-xl
      "
    >
      {/* Thumbnail */}
      <div className="relative h-44">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/40 via-slate-800 to-slate-900" />

        {/* Noise / depth overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Center play */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-black/40 p-4 backdrop-blur-sm opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition">
            <Play className="h-7 w-7 text-white" />
          </div>
        </div>

        {/* Top-left icon */}
        <div className="absolute top-3 left-3 flex items-center gap-2 text-xs text-gray-300">
          <Video className="h-4 w-4" />
          Video
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium leading-tight text-gray-100 line-clamp-2">
            {shortFileName}
          </h3>

          {/* Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="opacity-0 group-hover:opacity-100 transition"
              >
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-[#111827] border-[#1f2937]"
            >
              <DropdownMenuItem
                className="text-red-400 focus:bg-red-400/10"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen("delete-video", { videoId: id, fileName });
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-xs text-gray-400">
          Uploaded on {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </Card>
  );
}
