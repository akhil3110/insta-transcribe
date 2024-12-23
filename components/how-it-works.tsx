"use clent"
import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { title } from "process";
import { Rocket } from "lucide-react";

const  TimelineDemo = () => {
  const data = [
    {   
      title: "upload video", 
    },
    {
      title: "get Transcript",
    },
    {
      title: "Edit accordingly",
    },
    {
      title: "Embed the captions in video"
    }
  ];
  return (
  <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
        </div>
        <div className="grid grid-cols-8">
           <div className="col-span-8 md:col-span-2 md:order-none order-last">
              <Timeline data={data} />
            </div>
            <div className="col-span-8 md:col-span-6 w-full h-full md:order-none order-first items-center">
              <div className='flex items-center h-full  justify-center md:gap-x-14'>
                <div>
                  <div className="hidden sm:block text-2xl font-extrabold text-center">
                    Before
                  </div>
                  <div className="hidden mt-5 sm:block bg-gray-800/50 w-[240px] rounded-xl overflow-hidden z-50">
                    <video 
                      src="/homepage_demo_video (1).mp4" 
                      muted 
                      autoPlay 
                      loop
                      style={{ width: '240px', height: '426px' }}
                      />
                  </div>
                </div>
                <div className='hidden sm:block my-auto  mx-2 md:mx-0'>
                  <Rocket />
                </div>
                <div>
                  <div className="text-2xl hidden sm:block font-extrabold  text-center">
                    After
                  </div>
                  <div className="hidden mt-5 sm:block bg-gray-800/50 w-[240px] rounded-xl overflow-hidden z-50">
                    <video 
                      src="/transcribed_demo_video.mp4" 
                      muted 
                      autoPlay 
                      loop
                      style={{ width: '240px', height: '426px' }}
                      />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
  </section>
  );
}

export default TimelineDemo