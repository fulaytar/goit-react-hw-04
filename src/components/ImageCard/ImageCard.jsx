import css from "./ImageCard.module.css";

export default function ImageCard({ src, alt, openModal }) {
  return (
    <li>
      <img
        className={css.img}
        src={src}
        alt={alt}
        width={"300px"}
        onClick={() => {
          openModal(src);
        }}
      />
    </li>
  );
}
