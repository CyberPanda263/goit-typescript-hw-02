import React from 'react';
import css from './ImageCard.module.css';

interface ImageCardProps {
  item: {
    urls: {
      small: string;
      regular: string;
    };
    slug: string;
  };
  onClick: (url: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ item, onClick }) => {
  return (
    <div className={css.imageCard}>
      <img
        className={css.imageCardItem}
        src={item.urls.small}
        alt={item.slug}
        onClick={() => onClick(item.urls.regular)}
      />
    </div>
  );
};

export default ImageCard;
