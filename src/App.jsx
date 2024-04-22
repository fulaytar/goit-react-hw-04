import { useEffect, useState } from "react";
import { fetchImages } from "./image-api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  Modal.setAppElement("#root");
  // modal states
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");

  const [endOfCollection, setEndOfCollection] = useState(false);

  const handleSubmit = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setEndOfCollection(false);
  };

  function loadMore() {
    setPage(page + 1);
  }

  useEffect(() => {
    setError(false);

    if (query === "") {
      return;
    }
    async function getImages() {
      try {
        setIsLoading(true);
        const data = await fetchImages(query, page);
        if (data.total === 0) {
          setError(true);
          return;
        }
        const totalResults = data.total;
        const lastPage = Math.ceil(totalResults / page);
        console.log(totalResults, lastPage);
        if (page === lastPage) {
          setEndOfCollection(true);

          return;
        }

        setImages((prevImages) => {
          return [...prevImages, ...data.results];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [page, query]);

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} />

      {images.length > 0 ? (
        <ImageGallery images={images} openModal={openModal} />
      ) : null}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && !endOfCollection && (
        <LoadMoreBtn loadMore={loadMore} />
      )}
      {error && (
        <ErrorMessage
          message={"Failed to load images. Please try again later."}
        />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        imageUrl={modalImageUrl}
        onRequestClose={closeModal}
      />
      {endOfCollection && <p>No more images available.</p>}
      <Toaster position="top-right" />
    </>
  );
}
