import axios from "axios";
import * as types from "../types";

export const setSearchTerm = (term) => {
  return { type: "SET_SEARCH_TERM", term };
};

export const fetchBooks = () => {
  return (dispatch, getState) => {
    dispatch({ type: "FETCH_BOOKS_PENDING" });
    const state = getState();
    console.log({ state });
    const term = state.term;
    return axios
      .get(
        term
          ? `http://localhost:8080/books?q=${term}`
          : `http://localhost:8080/books?q=`
      )
      .then((res) => {
        dispatch({ type: "FETCH_BOOKS_SUCCESS", books: res.data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_BOOKS_FAILED", err: err.message });
      });
  };
};

export const fetchABook = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: types.FETCH_BOOK_PENDING });
    return axios
      .get(`http://localhost:8080/books/${id}`)
      .then((res) => {
        dispatch({ type: types.FETCH_BOOK_SUCCESS, book: res.data });
      })
      .catch((err) => {
        dispatch({ type: types.FETCH_BOOK_FAILED, err: err.message });
      });
  };
};

export const saveReview = (bookId, review) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  return (dispatch) => {
    dispatch({ type: types.SAVE_BOOK_REVIEW_PENDING });
    try {
      const { data } = axios.post(
        `http://localhost:8080/books/${bookId}`,
        JSON.stringify(review),
        config
      );
      dispatch({ type: types.SAVE_BOOK_REVIEW_SUCCESS, payload: data });
      dispatch(fetchABook(bookId));
    } catch (e) {
      dispatch({ type: types.SAVE_BOOK_REVIEW_FAILED, err: e.message });
    }
  };
};
