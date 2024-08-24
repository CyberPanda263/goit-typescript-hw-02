import React from "react";
import css from "./LoadMoreBtn.module.css";

type Props = {
  onClick: () => void;
};

const LoadMoreBtn = ({ onClick }: Props) => (
  <button className={css.loadMoreBtn} onClick={onClick}>
    Load more
  </button>
);

export default LoadMoreBtn;
