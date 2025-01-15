"use client"
import useModalStore from "@/store/modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { deleteVideo } from "@/actions/deleteVideo";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const DeleteVideoModal = ({ onVideoDeleted }: { onVideoDeleted?: (id: string) => void }) => {
    const { isOpen, onClose, type, data } = useModalStore();
    const isModalOpen = isOpen && type === "delete-video";
    const router = useRouter();
    const {data: session} = useSession()
  
    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-neutral-800 text-white p-0 rounded-lg shadow-lg overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold text-white">
              Delete Video
            </DialogTitle>
            <DialogDescription className="text-center text-neutral-400">
              Are you sure you want to delete this video?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-neutral-900 px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <Button
                onClick={() => onClose()}
                variant="ghost"
                className="bg-neutral-700 text-white hover:bg-neutral-600"
              >
                Cancel
              </Button>
              <Button
                onClick={async (e) => {
                  e.preventDefault()

                  if (!data?.videoId || !session?.user?.email || !data?.fileName) {
                    toast.error("Invalid data. Cannot delete video.");
                    return;
                  }
                  const res = await deleteVideo(data?.videoId, session?.user?.email  ,data?.fileName);
  
                  if (res) {
                    toast.success("Video Deleted Successfully");
                    //@ts-expect-error: onVideo type
                    onVideoDeleted(data?.videoId); // Update the state
                  } else {
                    toast.error("Something went wrong");
                  }
  
                  router.refresh();
                  onClose();
                }}
                className="bg-red-600 text-white hover:bg-red-500"
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
export default DeleteVideoModal;
  
