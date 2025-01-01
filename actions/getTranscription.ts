import { auth } from "@/auth";
import prisma from "@/lib/db";
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {GetTranscriptionJobCommand, ListTranscriptionJobsCommand, StartTranscriptionJobCommand, TranscribeClient} from "@aws-sdk/client-transcribe";
import { getVideoSignedUrl } from "./getVideoSignedUrl";

if (!process.env.AWS_PUBLIC_ACCESS_KEY || !process.env.AWS_SECERET_ACCESS_KEY) {
    throw new Error("AWS_ACCESS_KEY_ID and SECRET_ACCESS_KEY must be defined in environment variables.");
}

const awsTrancribeClient = new TranscribeClient({
    region: "ap-south-1",
    credentials:{
        accessKeyId: process.env.AWS_PUBLIC_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECERET_ACCESS_KEY
    }
})

   

export const getTranscription = async(fileName: string ) =>{
    try {

        const session = await auth();

        const videoExist = await prisma.video.findFirst({
            where: {
                fileName: fileName
            }
        })
        
        const folderName = `${session?.user?.email?.split('@')[0]}`
        const videoUrl = await getVideoSignedUrl(fileName)
        
        console.log(videoUrl)

        const transcriptionJob = new StartTranscriptionJobCommand({
            TranscriptionJobName: fileName,
            OutputBucketName: 'bucket.akhilparmar.dev',
            OutputKey: `${folderName}/${fileName}.transcription`,
            IdentifyLanguage: true,
            Media: {
                MediaFileUri: `https://bucket.akhilparmar.dev.s3.ap-south-1.amazonaws.com/${folderName}/${fileName}`
            }
        })

        awsTrancribeClient.send(transcriptionJob)

        return {
            status: "Transcription Completed"
        }
    

    } catch (error) {
        console.log("some thing went wrong", error)
    }
}