import {S3Client} from "@aws-sdk/client-s3"

if (!process.env.NEXT_PUBLIC_AWS_PUBLIC_ACCESS_KEY || !process.env.NEXT_PUBLIC_AWS_SECERET_ACCESS_KEY) {
    throw new Error("AWS_ACCESS_KEY_ID and SECRET_ACCESS_KEY must be defined in environment variables.");
}

console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_PUBLIC_ACCESS_KEY);
console.log("SECRET_ACCESS_KEY:", process.env.AWS_SECERET_ACCESS_KEY);


const s3  =  new S3Client({
    region: "ap-south-1",
    credentials:{
        accessKeyId: process.env.NEXT_PUBLIC_AWS_PUBLIC_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECERET_ACCESS_KEY
    }
})

export default s3