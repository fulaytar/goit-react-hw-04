import { toast, Toaster } from "react-hot-toast";
import { useEffect, useRef } from "react";

export default function ErrorMessage({ errorMessage }) {
  const toastId = useRef(null);

  useEffect(() => {
    if (errorMessage) {
      if (toastId.current) {
        toast.dismiss(toastId.current);
      }
      toastId.current = toast.error(`${errorMessage}`);
    }
  }, [errorMessage]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
