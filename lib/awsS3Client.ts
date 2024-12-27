import {S3Client} from "@aws-sdk/client-s3"

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.SECRET_ACCESS_KEY) {
    throw new Error("AWS_ACCESS_KEY_ID and SECRET_ACCESS_KEY must be defined in environment variables.");
}

const s3  =  new S3Client({
    region: "ap-south-1",
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.SECRET_ACCESS_KEY
    }
})

export default s3