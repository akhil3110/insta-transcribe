import React from 'react';
import { Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';

export interface UploadFormData {
    video: FileList;
}

const UploadSection =() => {
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     reset
    //   } = useForm<UploadFormData>();

    //   const onSubmit = async (data: UploadFormData) => {
    //     console.dir(data)
    // }

  return (
    <form className="relative max-w-md mx-auto">
    <label 
      className="flex flex-col items-center justify-center md:mt-5 w-[300px] md:w-[500px] h-64 border-2 border-dashed border-gray-300 dark:border-[#1E293B] rounded-lg cursor-pointer bg-white dark:bg-[#1E293B] hover:bg-gray-50 dark:hover:bg-[#686b74] transition-colors"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <Upload className="w-12 h-12 text-[#6366F1] mb-4" />
        <p className="mb-2 text-sm text-gray-500 dark:text-[#E5E7EB]">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-[#E5E7EB]">MP4, MOV up to 500MB</p>
      </div>
      <input 
        type="file" 
        className="hidden" 
        accept="video/*" 
        // {...register('video',{
        //     required: "Please select a file",
        // })}
        // onChange={(e: any) =>{
        //     register('video').onChange(e);
        //     if(e.target.files?.length){
        //         handleSubmit(onSubmit)
        //     }
        // }}
    />
    </label>
  </form>
  );
}

export default UploadSection