"use client";
import { getAllVideosOfUser } from "@/actions/getAllVideosOfUser";
import VideoDetailsCard from "@/components/video-details-card";
import { CircleUserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface videoType {
    id: string;
    fileName: string;
    UserId: string;
    createdAt: Date;
    updatedAt: Date;
}

const Dashboard = () => {
    const { data: session } = useSession();
    const [allVideos, setAllVideos] = useState<videoType[]>([]);

    useEffect(() => {
        if (session?.user?.id) {
            (async () => {
                const data = await getAllVideosOfUser(session?.user?.id!);
                if (data) {
                    setAllVideos(data);
                }
            })();
        }
    }, [session?.user?.id]);

    //@ts-ignore
    const plan = session?.user?.plan || "free";

    return (
        <div className="w-full h-full bg-gray-900 text-white overflow-y-scroll pb-10">
            <div className="max-w-7xl mx-auto mt-5">
                {/* Plan Info and User Details */}
                <div className="bg-gray-800 p-4 rounded-md mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* User Avatar */}
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                            <CircleUserRound className="w-6 h-6 text-gray-300" />
                        </div>

                        {/* User Info */}
                        <div>
                            <div className="text-lg font-bold">{session?.user?.name || "User"}</div>
                            <div className="text-sm text-gray-400">{session?.user?.email}</div>
                        </div>
                    </div>

                    {/* Plan Info */}
                    <div className="text-right">
                        <div className="text-lg font-bold">
                            Current Plan: <span className="text-blue-500">{plan}</span>
                        </div>
                        <Link href="/pricing" className="text-blue-400 hover:underline text-sm">
                            Upgrade Plan
                        </Link>
                    </div>
                </div>

                {/* Videos Section */}
                <div className="mt-10">
                    <div className="text-3xl font-extrabold">Your Videos:</div>
                    <div className="mt-5">
                        {allVideos?.length > 0 ? (
                            <div className="grid grid-cols-4 gap-2">
                                {allVideos.map((v) => (
                                    <VideoDetailsCard
                                        key={v.id}
                                        id={v.id}
                                        fileName={v.fileName}
                                        createdAt={v.createdAt}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center mt-10">
                                <p className="text-lg text-gray-400">No videos found!</p>
                                <Link
                                    href="/"
                                    className="text-blue-400 hover:underline text-sm mt-2 inline-block"
                                >
                                    Try transcribing a video
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
