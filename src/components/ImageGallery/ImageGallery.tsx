import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../../Types/types";

type Props = {
  items: Image[];
  onImageClick: (image: Image) => void;
};

const ImageGallery = ({ items, onImageClick }: Props) => (
  <ul className={css.gallery}>
    {items.map((image) => (
      <li key={image.id} className={css.item}>
        <ImageCard image={image} onClick={onImageClick} />
      </li>
    ))}
  </ul>
);

export default ImageGallery;
