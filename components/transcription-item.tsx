interface TranscriptionItemProps {
    item: {
        start_time: string,
        end_time: string,
        content: string
    },
    handleContentChange: (ev: any) => void;
}

const TranscriptionItem = ({
    item,
    handleContentChange
}: TranscriptionItemProps) => {

    if(!item){
        return '';
    }

    return ( 
        <>
           <div className="col-span-1 text-center w-full"> {item.start_time} </div>
           <div className="col-span-1 text-center w-full    "> {item.end_time} </div>
           <input className="col-span-1 text-center bg-blue-900" defaultValue={item.content} onChange={handleContentChange} />
        </>
     );
}
 
export default TranscriptionItem;