import React from "react";
import css from "./ImageGallery.module.css";

import ImageCard from "../ImageCard/ImageCard";

interface ImageItem {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  slug: string;
}

interface ImageGalleryProps {
  items: ImageItem[];
  onImageClick: (url: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, onImageClick }) => {
  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li key={item.id} className={css.listItem}>
          <ImageCard item={item} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
