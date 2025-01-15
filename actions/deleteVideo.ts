"use server"
import s3 from "@/lib/awsS3Client"
import prisma from "@/lib/db"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"

export const deleteVideo = async(id: string,email: string ,filename: string) => {
    try {

        const video = await prisma.video.findUnique({
            where: {
                id: id
            }
        })
        if(!video){
            return null
        }

        const floderName = email.split("@")[0]

        const deleteVideocommand =new  DeleteObjectCommand({
            Bucket: "bucket.akhilparmar.dev",
            Key: `${floderName}/${filename}`
        })

        const deleteTranscriptionFileCommand = new DeleteObjectCommand({
            Bucket: "bucket.akhilparmar.dev",
            Key: `${floderName}/${filename}.transcription`
        })

        const deletVideo = await s3.send(deleteVideocommand)
        const deleteTranscriptionFile = await s3.send(deleteTranscriptionFileCommand)
        

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