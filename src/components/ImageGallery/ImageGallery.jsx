import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={css.list}>
      {images.map((element) => (
        <ImageCard
          key={element.id}
          src={element.urls.small}
          alt={element.alt_description}
          openModal={openModal}
        />
      ))}
    </ul>
  );
}
