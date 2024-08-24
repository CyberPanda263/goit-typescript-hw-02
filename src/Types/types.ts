export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  description: string;
  user: {
    name: string;
  };
  likes: number;
}
export interface SearchResult {
  total: number;
  total_pages: number;
  results: Image[];
}
