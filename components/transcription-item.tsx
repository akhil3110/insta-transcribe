interface TranscriptionItemProps {
    item: {
      start_time: string;
      end_time: string;
      content: string;
    };
    //@ts-expect-error: type event
    handleContentChange: (ev) => void;
  }
  
  const TranscriptionItem = ({
    item,
    handleContentChange,
  }: TranscriptionItemProps) => {
    if (!item) {
      return null;
    }
  
    return (
      <>
        <div className="col-span-1 text-center py-2 px-4 bg-gray-800 text-gray-200 rounded-md shadow-sm border border-gray-600">
          {item.start_time}
        </div>
        <div className="col-span-1 text-center py-2 px-4 bg-gray-800 text-gray-200 rounded-md shadow-sm border border-gray-600">
          {item.end_time}
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <input
            className="w-full py-2 px-4 text-center bg-gray-700 text-gray-200 rounded-lg border border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:bg-gray-800 placeholder-gray-400 outline-none transition-all shadow-md"
            defaultValue={item.content}
            onChange={handleContentChange}
            placeholder="Edit caption..."
          />
        </div>
      </>
    );
  };
  
  export default TranscriptionItem;
  