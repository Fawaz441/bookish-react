import * as types from "../types";

const initialState = {
  books: [],
  loading: true,
  error: false,
  term: "",
  book: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_BOOKS_PENDING:
      return { ...state, loading: true };
    case types.FETCH_BOOKS_SUCCESS:
      return { ...state, books: action.books, loading: false, error: false };
    case types.SET_SEARCH_TERM:
      return { ...state, term: action.term };
    case types.FETCH_BOOKS_FAILED:
      return { ...state, loading: false, error: true };
    case types.FETCH_BOOK_PENDING:
      return { ...state, loading: true };
    case types.FETCH_BOOK_SUCCESS:
      return { ...state, book: action.book, loading: false, error: false };
    case types.FETCH_BOOK_FAILED:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
export default reducer;
