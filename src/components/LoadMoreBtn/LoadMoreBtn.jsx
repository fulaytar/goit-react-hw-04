import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ loadMore }) {
  return (
    <button className={css.btn} onClick={loadMore}>
      Load more
    </button>
  );
}
