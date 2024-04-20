import css from "./ImageCard.module.css";
import Modal from "react-modal";

export default function ImageCard({ scr, alt }) {
  return (
    <li>
      <img className={css.img} src={scr} alt={alt} width={"300px"} />
    </li>
  );
}
