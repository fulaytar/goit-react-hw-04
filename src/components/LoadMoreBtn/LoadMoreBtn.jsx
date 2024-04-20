import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ loadMore, status }) {
  return (
    <button className={css.btn} onClick={loadMore} disabled={status}>
      Load more
    </button>
  );
}
