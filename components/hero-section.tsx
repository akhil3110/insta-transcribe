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
            <div className="flex flex-wrap justify-center gap-6 mt-8">
      {badges.map((badge) => (
        <div
          key={badge}
          className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full text-sm text-gray-600 dark:text-gray-300 border border-indigo-100 dark:border-indigo-800"
        >
          {badge}
        </div>
      ))}
    </div>
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-b from-indigo-200 dark:from-indigo-900/30 to-transparent rounded-full blur-3xl opacity-30 dark:opacity-20" />
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-t from-purple-200 dark:from-purple-900/30 to-transparent rounded-full blur-3xl opacity-30 dark:opacity-20" />
      </div>
        </div>
     );
}
 
export default HeroSection;