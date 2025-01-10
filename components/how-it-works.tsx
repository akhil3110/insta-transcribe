"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";

const TimelineDemo = () => {
  const data = [
    { title: "upload video" },
    { title: "get Transcript" },
    { title: "Edit accordingly" },
    { title: "Embed the captions in video" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>
        </div>
        <div className="grid grid-cols-8">
          {/* First motion.div - appears from left to right */}
          <motion.div
            className="col-span-8 md:col-span-2 md:order-none order-last"
            initial={{ x: -100, opacity: 0 }} // Start from left (off-screen)
            whileInView={{ x: 0, opacity: 1 }} // Move to normal position with full opacity
            transition={{ duration: 1, ease: "easeOut" }} // Slow movement with ease-out
            viewport={{   amount: 0.3 }} // Trigger when 30% of the element is visible
          >
            <Timeline data={data} />
          </motion.div>

          {/* Second motion.div - appears from right to left */}
          <motion.div
            className="col-span-8 md:col-span-6 w-full h-full md:order-none order-first items-center"
            initial={{ x: 100, opacity: 0 }} // Start from right (off-screen)
            whileInView={{ x: 0, opacity: 1 }} // Move to normal position with full opacity
            transition={{ duration: 1, ease: "easeOut" }} // Slow movement with ease-out
            viewport={{  amount: 0.3 }} // Trigger when 30% of the element is visible
          >
            <div className="flex flex-col md:flex-row items-center h-full justify-center md:gap-x-14">
              <div>
                <div className=" text-2xl font-extrabold text-center text-white">
                  Before
                </div>
                <div className="mt-5 bg-gray-800/50 w-[240px] rounded-xl overflow-hidden z-50">
                  <video
                    src="/homepage_demo_video (1).mp4"
                    muted
                    autoPlay
                    loop
                    className="w-[240px] h-[426px]"
                  />
                </div>
              </div>
              <div className="hidden sm:block my-auto mx-2 md:mx-0 text-white">
                <Rocket />
              </div>
              <div>
                <div className="text-2xl mt-8 md:mt-0 font-extrabold text-center text-white">
                  After
                </div>
                <div className="mt-5  bg-gray-800/50 w-[240px] rounded-xl overflow-hidden z-50">
                  <video
                    src="/transcribed_demo_video.mp4"
                    muted
                    autoPlay
                    loop
                    className="w-[240px] h-[426px] aspect-auto"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TimelineDemo;
