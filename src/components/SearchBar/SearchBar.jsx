import css from "./SearchBar.module.css";
import { toast } from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

/* SearchBar приймає один проп onSubmit - функцію для передачі значення інпуту під час сабміту форми. */

export default function SearchBar({ handleSubmit }) {
  const onSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const value = form.query.value;
    console.log(event.target.query);
    if (!value) {
      toast.error("Your search term is empty", {
        style: {
          color: "#ffffff",
          backgroundColor: "#ff6b6b",
        },
      });
      return;
    }
    handleSubmit(value);
    form.reset();
  };
  return (
    <header className={css.container}>
      <form className={css.form} onSubmit={onSearch}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button className={css.btn} type="submit">
          <IoSearch />
        </button>
      </form>
    </header>
  );
}
