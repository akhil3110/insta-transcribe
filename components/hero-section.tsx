const HeroSection = () => {
    return (
      <div className="relative text-center h-[300px] sm:h-[200px] flex flex-col justify-center items-center">
        <h1 className="text-3xl sm:text-5xl text-white mb-4 sm:mb-6 font-extrabold tracking-tight leading-tight">
          Transform Your Videos with{" "}
          <span className="text-yellow-400">AI-Powered Transcriptions</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-100 max-w-2xl mx-auto font-medium leading-relaxed">
          Upload your short-form videos and receive precise transcriptions in
          minutes. Built for content creators, editors, and social media
          managers.
        </p>
      </div>
    );
  };
  
  export default HeroSection;
  