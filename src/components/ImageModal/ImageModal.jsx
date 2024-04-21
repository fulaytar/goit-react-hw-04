import css from "./ImageModal.module.css";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function ImageModal({ modalImage }) {
  return (
    <>
      <img className={css.img} src={modalImage} alt="" width={"300px"} />
    </>
  );
}
