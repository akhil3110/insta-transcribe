interface TranscriptionItemProps {
    item: {
        start_time: string,
        end_time: string,
        content: string
    }
}

const TranscriptionItem = ({
    item
}: TranscriptionItemProps) => {
    return ( 
        <>
           <div className="col-span-1">
                {item.start_time}
           </div>
           <div className="col-span-1">
                {item.end_time}
           </div>
           <div className="col-span-1">
                {item.content}
           </div>
        </>
     );
}
 
export default TranscriptionItem;