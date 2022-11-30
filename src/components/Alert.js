import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AlertSuccess = (message) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
export const AlertRemove = (message) => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
