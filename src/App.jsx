import { useState, useEffect } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import axios from "axios";

export default function App() {
  const [error, setError] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [countBadClick, setCountBadClick] = useState(0);
  const [saveData, setSaveData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusLoader, setStatusLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPerPage, setCurrentPerPage] = useState(10);
  const [saveQuery, setSaveQuery] = useState("");

  const ACCESS_KEY = "_5GkMmgOY3uWBKwoENAS_StEo0bzggOwTmwgOmyP1Ww";
  axios.defaults.baseURL = "https://api.unsplash.com/";

  async function sendRequest(event) {
    event.preventDefault();
    setSaveQuery(currentQuery);
    if (currentQuery === "") {
      setError(true);
      setErrorMessage("Please enter text");
      setCountBadClick(countBadClick + 1);
      return;
    }
    setError(false);
    setStatusLoader(true);

    try {
      const response = await axios.get("search/photos/", {
        params: {
          query: currentQuery,
          client_id: ACCESS_KEY,
          page: 1,
          per_page: 10,
        },
      });
      if (response.data.results.length === 0) {
        setError(true);
        setErrorMessage("No results found");
        setCurrentQuery("");
        setSaveData([]);
        return;
      }

      setSaveData(response.data.results);
    } catch (error) {
      setError(true);
      setErrorMessage("Request failed");
      setCurrentQuery("");
      setSaveData([]);
    } finally {
      setStatusLoader(false);
      setCurrentQuery("");
    }
  }

  async function LoadMore() {
    console.log("load");
    setStatusLoader(true);
    setCurrentPage(currentPage + 1);
    setCurrentPerPage(currentPerPage + 10);

    try {
      const response = await axios.get("search/photos/", {
        params: {
          query: saveQuery,
          client_id: ACCESS_KEY,
          page: currentPage,
          per_page: currentPerPage,
        },
      });

      const totalResults = response.data.total;
      const lastPage = Math.ceil(totalResults / currentPerPage);
      console.log(totalResults, lastPage);
      if (currentPage === lastPage) {
        setError(true);
        setErrorMessage("No more results found");
        return;
      }
      const newArray = saveData.concat(response.data.results);
      setSaveData(newArray);
      console.log(newArray);
    } catch (error) {
      setError(true);
      setErrorMessage("Request failed");
    } finally {
      setStatusLoader(false);
    }
  }

  function handleChange(event) {
    const value = event.target.value;
    setCurrentQuery(value);
  }
  return (
    <>
      <SearchBar
        sendRequest={sendRequest}
        query={currentQuery}
        setQuery={handleChange}
      />
      {saveData.length > 0 ? <ImageGallery saveData={saveData} /> : null}
      <Loader statusLoader={statusLoader} />
      <ErrorMessage
        status={error}
        countBadClick={countBadClick}
        errorMessage={errorMessage}
      />
      {saveData.length > 0 ? <LoadMoreBtn loadMore={LoadMore} /> : null}
    </>
  );
}
