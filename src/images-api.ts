import axios from "axios";
import { Image, SearchResult } from "./Types/types";

const ACCESS_KEY = "b67HWZv_CXbbKTODV7K3MHDR1jN7rXqS8dtB6OO1eE4";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImagesWithName = async (
  name: string,
  page: number = 1,
  perPage: number = 10
): Promise<SearchResult> => {
  try {
    const response = await axios.get<SearchResult>("/search/photos", {
      params: {
        query: name,
        page: page,
        per_page: perPage,
        client_id: ACCESS_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
