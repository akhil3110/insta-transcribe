import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import useModalStore from "@/store/modal-store";

const VideoFormatWarningModal = () => {
    
    const { isOpen, onClose, type } = useModalStore();
    const isModalOpen = isOpen && type === "video-format-warning";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-neutral-800 text-white p-0 rounded-lg shadow-lg overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <div className="flex flex-col items-center">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
              <DialogTitle className="text-2xl font-bold text-center text-white">
                Unsupported Video Format
              </DialogTitle>
              <DialogDescription className="text-center text-neutral-400 mt-2">
                The video you uploaded is not in the desired format. Please upload a vertical video (e.g., YouTube Shorts or Instagram Reels).
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="bg-neutral-900 px-6 py-4">
            <div className="flex items-center justify-center w-full">
              <Button
                onClick={onClose}
                className="bg-red-600 text-white hover:bg-red-500"
              >
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
};

export default VideoFormatWarningModal;
