import css from "./ErrorMessage.module.css";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function ErrorMessage({ status, countBadClick, errorMessage }) {
  useEffect(() => {
    if (status) {
      toast.error(errorMessage);
    }
  }, [status, countBadClick, errorMessage]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
