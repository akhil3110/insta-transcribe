"use server"
import prisma from "@/lib/db"

export const deleteVideo = async(id: string) => {
    try {
        
        const video = await prisma.video.findUnique({
            where: {
                id: id
            }
        })

        console.log(video)
        if(!video){
            return null
        }

        await prisma.video.delete({
            where: {
                id
            }
        })

        return {message: "Video Deleted"}

    } catch (error) {
        console.log("Delete Video", error)
    }
}