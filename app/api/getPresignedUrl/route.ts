import { auth } from "@/auth";
import s3 from "@/lib/awsS3Client";
import { NextResponse } from "next/server";
import  {S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import prisma from "@/lib/db";





export async function POST(req: Request) {
    try {
        const { fileType } = await req.json();
        const session = await auth();

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!fileType) {
            return new NextResponse("File type missing", { status: 400 });
        }

        if (!session.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await prisma.user.findFirst({
            where:{
                email: session.user.email!
            }
        })

        if(!user){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const folderName = `${session.user.email?.split('@')[0]}`
        const uniqueFileName = `${session.user?.id}-${Date.now()}.${fileType.split("/")[1]}`;

        const command  = new PutObjectCommand({
            Bucket: "bucket.akhilparmar.dev",
            Key: `${folderName}/${uniqueFileName}`,
            ContentType: fileType
        })
        
        //@ts-ignore
        const URL = await getSignedUrl(s3, command)


        const video = await prisma.video.create({
            data: {
                fileName: uniqueFileName,
                UserId: user.id
            }
        })
        

        return NextResponse.json({
            url: URL,
            fileName: uniqueFileName,
            videoId: video.id 
        })
       
    } catch (error) {
        //@ts-ignore
        console.error("Error:", error.message, error.stack);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
