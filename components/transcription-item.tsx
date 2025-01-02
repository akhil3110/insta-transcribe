interface TranscriptionItemProps {
    item: {
        start_time: string,
        end_time: string,
        content: string
    },
    handleStartTimesChange: (ev: any) => void;
    handleEndTimesChange: (ev: any) => void;
    handleContentChange: (ev: any) => void;
}

const TranscriptionItem = ({
    item,
    handleStartTimesChange,
    handleEndTimesChange,
    handleContentChange
}: TranscriptionItemProps) => {

    if(!item){
        return '';
    }
    
    return ( 
        <>
           <input className="col-span-1" defaultValue={item.start_time} onChange={handleStartTimesChange} />
           <input className="col-span-1" defaultValue={item.end_time} onChange={handleEndTimesChange} />
           <input className="col-span-1" defaultValue={item.content} onChange={handleContentChange} />
        </>
     );
}
 
export default TranscriptionItem;