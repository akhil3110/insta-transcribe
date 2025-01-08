"use client"
import { getAllVideosOfUser } from "@/actions/getAllVideosOfUser";
import VideoDetailsCard from "@/components/video-details-card";
import { CircleUserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface videoType {
    id: string;
    fileName: string;
    UserId: string;
    createdAt: Date;
    updatedAt: Date;
}

const Dashboard = () => {

    const {data: session} = useSession()
    const [allVideos,setAllVideos] = useState<videoType[]>([])

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
    const plan = session?.user?.plan || "free"

    return ( 
        <div className="w-full h-full bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto mt-5">
                <div className="w-full flex justify-between ml-2 md:ml-0">
                    <div className="flex gap-x-2 text-lg font-semibold">
                        <CircleUserRound />
                        {session?.user?.name}
                    </div>
                    <div className="font-semibold hidden sm:block">
                        Your Plan: <span className="font-bold">{plan}</span>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="text-3xl font-extrabold">
                        Your Videos:
                    </div>
                    <div className="mt-5">
                        <div className="grid grid-cols-4 gap-2">
                            {allVideos?.length>0 && allVideos?.map((v) => (
                                <VideoDetailsCard 
                                    key={v.id}
                                    id = {v.id}
                                    fileName={v.fileName}
                                    createdAt={v.createdAt}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Dashboard;