import "./App.css";
import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { InfinitySpin } from "react-loader-spinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { fetchImagesWithName } from "./images-api";
import { Image, SearchResult } from "./Types/types";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleSearch = async (name: string) => {
    setQuery(name);
    setPage(1);
    try {
      setImages([]);
      setError(false);
      setLoading(true);
      const data: SearchResult = await fetchImagesWithName(name, 1);
      setImages(data.results);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const data = await fetchImagesWithName(query, page + 1);
      setImages((prevImages) => [...prevImages, ...data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
      {loading && <InfinitySpin width="200" color="#4fa94d" />}
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery items={images} onImageClick={handleImageClick} />
      )}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={handleCloseModal}
          image={selectedImage}
        />
      )}
    </>
  );
}

export default App;
