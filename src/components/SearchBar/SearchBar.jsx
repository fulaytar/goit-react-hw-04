import css from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";

/* SearchBar приймає один проп onSubmit - функцію для передачі значення інпуту під час сабміту форми. */

export default function SearchBar() {
  return (
    <header className={css.container}>
      <form className={css.form}>
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
