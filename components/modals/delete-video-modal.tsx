import useModalStore from "@/store/modal-store";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

const DeleteVideoModal = () => {
    const { isOpen, onClose, type, data } = useModalStore();

    const isModalOpen = isOpen && type === "delete-video";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Video
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-600">
                        Are you sure you want to delete this video ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                // Add your delete logic here
                                console.log("Deleting video:", data?.videoId);
                                onClose();
                            }}
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
