"use server"
import prisma from "@/lib/db"

export const getVideoDetails =async (id: string) =>{

    try {    
        const video = await prisma.video.findFirst({
            where: {
                id: id
            },
            include: {
                user: true
            }
        })

        if(!video){
            return null
        }

        return video

    } catch (error) {
        
    }

}