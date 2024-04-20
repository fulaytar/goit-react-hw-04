import css from "./ImageCard.module.css";

export default function ImageCard({ scr, alt }) {
  return (
    <li>
      <img
        className={css.img}
        src={scr}
        alt={alt}
        width={"300px"}
      />
    </li>
  );
}
