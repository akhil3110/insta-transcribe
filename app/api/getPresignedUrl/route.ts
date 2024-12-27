import { auth } from "@/auth";
import s3 from "@/lib/awsS3Client";
import { NextResponse } from "next/server";
import  {S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { url } from "inspector";
import prisma from "@/lib/prisma";





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

        const uniqueFileName = `${session.user?.id}-${Date.now()}.${fileType.split("/")[1]}`;
        
        const command  = new PutObjectCommand({
            Bucket: "bucket.akhilparmar.dev",
            Key: `${session.user?.email}/${uniqueFileName}`,
            ContentType: fileType
        })
    
        const URL = await getSignedUrl(s3, command)

        const video = await prisma.video.create({
            data: {
                fileName: uniqueFileName,
                UserId: session.user?.id!
            }
        })
        

        return NextResponse.json({
            url: URL,
            fileName: uniqueFileName,
            videoId: video.id  
        })
       
    } catch (error) {
        console.error("Error generating presigned URL:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
