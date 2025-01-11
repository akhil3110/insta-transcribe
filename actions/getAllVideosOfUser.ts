"use server"
import prisma from "@/lib/db";

export const getAllVideosOfUser = async(id: string) => {
    try {
        const allVideos = await prisma.video.findMany({
            where: {
                UserId: id
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        if(!allVideos){
            return null
        }

        return allVideos
    } catch (error) {
        console.log(error)
        throw  error;
    }
}