import { BackgroundBeams } from "./ui/background-beams";

const badges = [
    '10M+ Creator Videos',
    'TikTok Verified',
    'Instagram Ready'
  ];

const HeroSection = () => {
    return ( 
        <div className="text-center h-[300px] sm:h-[200px]">
            <h1 className="text-4xl sm:text-5xl text-gray-900 dark:text-white mb-6 font-extrabold">
                Transform Your Videos with
                <span className="text-indigo-600"> Transcription</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-center font-semibold leading-8">
                Upload your short-form videos and get accurate transcriptions in minutes. Perfect for content creators, social media managers, and video editors.
            </p>
            <BackgroundBeams className="" />
        </div>
    );
}
 
export default HeroSection;