import css from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";

/* SearchBar приймає один проп onSubmit - функцію для передачі значення інпуту під час сабміту форми. */

export default function SearchBar({ handleSubmit }) {
  const onSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const input = form.elements[0].value.trim();
    handleSubmit(input);
    form.reset();
  };
  return (
    <header className={css.container}>
      <form className={css.form} onSubmit={(e) => onSearch(e)}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          <IoSearch />
        </button>
      </form>
    </header>
  );
}
