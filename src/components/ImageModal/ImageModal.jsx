import Modal from "react-modal";

import css from "./ImageModal.module.css";
export default function ImageModal({ isOpen, imageUrl, onRequestClose }) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)", // темний фон з прозорістю
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none", // видаляємо рамку
      borderRadius: "10px", // закруглені кути
      maxWidth: "90%", // максимальна ширина контенту
      maxHeight: "90%", // максимальна висота контенту
      overflow: "hidden", // ховаємо зайвий контент, який може виходити за межі
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // тінь для ефекту підняття
      display: "flex", // використовуємо flex для центрування фото
      alignItems: "center", // центруємо по вертикалі
      justifyContent: "center", // центруємо по горизонталі
    },
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Image Modal"
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
      >
        <img src={imageUrl} alt="Large Image" />
      </Modal>
    </>
  );
}
