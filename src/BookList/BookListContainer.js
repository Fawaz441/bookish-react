import React, { useEffect } from "react";
import BookList from "./BookList";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/actions/actions";
import * as actions from "../redux/actions/actions";

const BookListContainer = () => {
  const dispatch = useDispatch();
  const { books, loading, error, term } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchBooks(term));
  }, [term, dispatch]);

  const onSearch = (event) => {
    dispatch(actions.setSearchTerm(event.target.value));
    dispatch(actions.fetchBooks());
  };

  return (
    <div>
      <SearchBox term={term} onSearch={onSearch} />
      <BookList books={books} loading={loading} error={error} />
    </div>
  );
};
export default BookListContainer;
