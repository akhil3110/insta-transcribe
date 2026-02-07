"use client";

import { getAllVideosOfUser } from "@/actions/getAllVideosOfUser";
import VideoDetailsCard from "@/components/video-details-card";
import DeleteVideoModal from "@/components/modals/delete-video-modal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface VideoType {
  id: string;
  fileName: string;
  createdAt: Date;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [videos, setVideos] = useState<VideoType[]>([]);

  useEffect(() => {
    if (!session?.user?.id) return;
    getAllVideosOfUser(session.user.id).then((data) => data && setVideos(data));
  }, [session?.user?.id]);

  const handleVideoDeleted = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  // @ts-expect-error
  const plan = session?.user?.plan || "free";

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold">
            Dashboard
          </h1>
          <p className="text-slate-400 mt-1">
            Manage and access your transcribed videos
          </p>
        </div>

        {/* User / Plan Card */}
        <Card className="bg-slate-800 border border-slate-700 shadow-sm">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <Avatar className="bg-slate-700">
                <AvatarFallback className="text-slate-200">
                  {session?.user?.name?.[0] ?? "U"}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">
                  {session?.user?.name}
                </p>
                <p className="text-sm text-slate-400">
                  {session?.user?.email}
                </p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <Badge className="bg-slate-700 text-slate-200">
                {plan.toUpperCase()} PLAN
              </Badge>
              <div>
                <Link href="/pricing">
                  <Button
                    variant="link"
                    size="sm"
                    className="text-blue-400 px-0"
                  >
                    Upgrade
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        <Separator className="bg-slate-700" />

        {/* Videos */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            Your Videos
          </h2>

          {videos.length === 0 ? (
            <Card className="bg-slate-800 border border-slate-700 p-10 text-center">
              <p className="text-slate-400">
                You haven’t transcribed any videos yet.
              </p>
              <Link href="/">
                <Button className="mt-4">Upload your first video</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoDetailsCard key={video.id} {...video} />
              ))}
            </div>
          )}
        </section>
      </div>

      <DeleteVideoModal onVideoDeleted={handleVideoDeleted} />
    </div>
  );
}
