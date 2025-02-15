// TOAST MESSAGES 
import { toast } from "react-toastify";

export const toastService = {

  successMsg: (message: string) => {
    toast.success(`${message}`);
  },
  errorMsg: (message: string) => {
    toast.error(`${message}`);
  },
  infoMsg: (message: string) => {
    toast.info(`${message}`);
  },
  warningMsg: (message: string) => {
    toast.warning(`${message}`); 
  },
};
