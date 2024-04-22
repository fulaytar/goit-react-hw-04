import css from "./ImageCard.module.css";

export default function ImageCard({ image, openModal }) {
  const handleClick = () => {
    openModal(image.urls.regular);
  };

  return (
    <li>
      {
        <img
          className={css.img}
          src={image.urls.small}
          alt={image.alt_description}
          width={"300px"}
          onClick={handleClick}
        />
      }
    </li>
  );
}
