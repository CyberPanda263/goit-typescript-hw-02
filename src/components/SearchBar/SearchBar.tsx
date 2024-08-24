import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

type Props = {
  onSubmit: (image: string) => void;
};

const SearchBar = ({ onSubmit }: Props) => {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const image = form.elements.namedItem("image") as HTMLInputElement;

    if (image.value.trim() === "") {
      toast.error("Please enter search term!");
      return;
    }
    onSubmit(image.value);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          name="image"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
