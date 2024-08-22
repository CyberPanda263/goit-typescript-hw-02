import axios from "axios";

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  description: string;
  [key: string]: any;
}

interface UnsplashResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export interface FetchGalleryResponse {
  items: GalleryItem[];
  totalItems: number;
  page: number;
  totalPages: number;
  pageSize: number;
}

const fetchGallery = async (
  query: string,
  page: number = 1,
  per_page: number = 12
): Promise<UnsplashResponse> => {
  const accessKey = "j_qTNdKOkwJ1X4PKFSDUAo0y8ouetFbWOThOfKd0JsU";
  const response = await axios.get<UnsplashResponse>(
    "https://api.unsplash.com/search/photos",
    {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      params: {
        query: query,
        page,
        per_page,
      },
    }
  );
  return response.data;
};

export default fetchGallery;
