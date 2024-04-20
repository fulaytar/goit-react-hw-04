import css from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";

/* SearchBar приймає один проп onSubmit - функцію для передачі значення інпуту під час сабміту форми. */

export default function SearchBar({ sendRequest, query, setQuery }) {
  return (
    <header className={css.container}>
      <form className={css.form} onSubmit={(e) => sendRequest(e)}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          value={query}
          onChange={setQuery}
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
