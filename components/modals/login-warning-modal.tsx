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
import { useRouter } from "next/navigation";

const LoginWarningModal = () => {
    const { isOpen, onClose, type } = useModalStore();
    const isModalOpen = isOpen && type === "login-warning";
    const router = useRouter();
  
    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-neutral-800 text-white p-0 rounded-lg shadow-lg overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold text-white">
              You need to login first
            </DialogTitle>
            <DialogDescription className="text-center text-neutral-400">
              Redirect to Login page ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-neutral-900 px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <Button
                onClick={() => 
                    onClose()}
                variant="ghost"
                className="bg-neutral-700 text-white hover:bg-neutral-600"
              >
                Cancel
              </Button>
              <Button
                onClick={async (e) => {
                    e.preventDefault()
                    router.push("/sign-in")

                    router.refresh();
                    onClose();
                }}
                className="bg-red-600 text-white hover:bg-red-500"
              >
                Login
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
export default LoginWarningModal;
  
