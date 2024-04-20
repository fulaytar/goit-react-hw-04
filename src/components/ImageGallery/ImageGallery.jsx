import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ saveData }) {
  return (
    <ul className={css.list}>
      {saveData.map((element) => (
        <ImageCard
          key={element.id}
          scr={element.urls.small}
          alt={element.alt_description}
        />
      ))}
    </ul>
  );
}
