import axios from "axios";

const API_KEY = "_5GkMmgOY3uWBKwoENAS_StEo0bzggOwTmwgOmyP1Ww";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImages = async (searchQuery, currentPage) => {
  const response = await axios.get("search/photos", {
    params: {
      query: searchQuery,
      page: currentPage,
      orientation: "landscape",
      per_page: 10,
      client_id: API_KEY,
    },
  });
  return response.data;
};
