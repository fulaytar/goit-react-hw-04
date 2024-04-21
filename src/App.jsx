import { useEffect, useState } from "react";
import { fetchImages } from "./image-api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleSubmit = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  function loadMore() {
    setPage(page + 1);
  }

  useEffect(() => {
    setErrorMessage("");

    if (query === "") {
      return;
    }
    async function getImages() {
      try {
        setIsLoading(true);
        const data = await fetchImages(query, page);
        if (data.total === 0) {
          setErrorMessage("No results found");
          return;
        }
        const totalResults = data.total;
        const lastPage = Math.ceil(totalResults / page);
        console.log(totalResults, lastPage);
        if (page === lastPage) {
          setErrorMessage("It`s last page");
          return;
        }

        setImages((prevImages) => {
          return [...prevImages, ...data.results];
        });
      } catch (error) {
        setErrorMessage("Request failed");
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [page, query]);

  function openModal(scr) {
    setShowModal(!showModal);
    setModalImage(scr);
  }

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {images.length > 0 ? (
        <ImageGallery images={images} openModal={openModal} />
      ) : null}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && !errorMessage && (
        <LoadMoreBtn loadMore={loadMore} />
      )}
      {showModal && <ImageModal modalImage={modalImage} />}
    </>
  );
}
