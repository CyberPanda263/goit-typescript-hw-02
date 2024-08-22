import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGalery";
import fetchGallery from "../servises/gallery-api";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoaderMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrrorMassage";

interface ImageResult {
  id: string;
  url: string;
  alt: string;
}

const App = () => {
  const [results, setResults] = useState<ImageResult[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImg, setCurrentImg] = useState<string>("");

  const openModal = (imageUrl: string) => {
    setCurrentImg(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImg("");
  };

  useEffect(() => {
    const getPhotos = async () => {
      if (!query) {
        return;
      }
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchGallery(query, page, 12);
        setResults((prev) => [...prev, ...response.results]);
        setTotal(response.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPhotos();
  }, [query, page]);

  const handleSetQuery = (query: string) => {
    setQuery(query);
    setResults([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSetQuery} />
      {isError && <ErrorMessage />}
      <ImageGallery items={results} onImageClick={openModal} />
      {isLoading && <Loader />}
      {total > page && !isLoading && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      <Toaster
       position="top-right"
       reverseOrder={false}
       />
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        imageUrl={currentImg}
      />
    </>
  );
};

export default App;