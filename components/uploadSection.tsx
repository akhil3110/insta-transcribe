"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { StoreTranscription } from "@/actions/StoreTranscriptionFile";


export interface UploadFormData {
  video: FileList;
}

const UploadSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!session) {
        toast.error("Please log in first to upload a video.");
        return;
      }

      setLoading(true);
      e.preventDefault();
      const file = e.target?.files?.[0];
      if (!file) {
        toast.error("No file selected.");
        setLoading(false);
        return;
      }

      const presignedUrl = await axios.post("/api/getPresignedUrl", {
        fileType: file.type,
      });
      setUrl(presignedUrl.data.url);

      const res = await fetch(presignedUrl.data.url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      const transcription = await StoreTranscription(presignedUrl.data.fileName, session.user?.email!)

      setLoading(false);
      if (res.ok) {
        toast.success("File uploaded successfully!");
        router.push(`/videos/${presignedUrl.data.videoId}`);
      } else {
        toast.error("Failed to upload the video.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong while uploading.");
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-md mx-auto">
      <label className="flex flex-col items-center justify-center md:mt-5 w-[300px] md:w-[500px] h-64 border-2 border-dashed border-gray-300 dark:border-[#1E293B] rounded-lg cursor-pointer bg-white dark:bg-[#1E293B] hover:bg-gray-50 dark:hover:bg-[#686b74] transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-12 h-12 text-[#6366F1] mb-4" />
          <p className="mb-2 text-sm text-gray-500 dark:text-[#E5E7EB]">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-[#E5E7EB]">MP4, MOV up to 500MB</p>
        </div>
        <input
          disabled={!!loading}
          type="file"
          className="hidden"
          accept="video/*"
          onChange={upload}
        />
      </label>
    </div>
  );
};

export default UploadSection;
