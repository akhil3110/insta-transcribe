"use client"
import { useEffect, useState } from "react";
import DeleteVideoModal from "../modals/delete-video-modal";
import LoginWarningModal from "../modals/login-warning-modal";

const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted) return null;

    return ( 
        <>
           <DeleteVideoModal/> 
           <LoginWarningModal/>
        </>
     );
}
 
export default ModalProvider;