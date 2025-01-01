"use server"
import { auth } from "@/auth";
import s3 from "@/lib/awsS3Client"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export const getVideoSignedUrl =async (key: string) =>{
    try {
        
        const session = await auth();

        const command = new GetObjectCommand({
            Bucket: 'bucket.akhilparmar.dev',
            Key: `${session?.user?.email!}/${key}`
        })

        //@ts-ignore
        const url = await getSignedUrl(s3,command, {expiresIn: 60*24})

        if(!url){
            return null
        }

        return url

    } catch (error) {
        console.log(error)
    }
}