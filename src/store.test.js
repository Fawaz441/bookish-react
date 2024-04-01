import axios from "axios";
import * as actions from "./redux/actions/actions";
import store from "./store";

describe("Store", () => {
  const books = [{ id: 1, name: "Refactoring" }];

  it("Fetches book from remote server", () => {
    axios.get = jest.fn().mockImplementation(() => {
      return Promise.resolve({ data: books });
    });
    return store.dispatch(actions.fetchBooks()).then(() => {
      const state = store.getState();
      expect(state.books.length).toEqual(books.length);
      expect(state.books).toEqual(books);
    });
  });

  it("Performs a search", () => {
    axios.get = jest.fn().mockImplementation(() => {
      return Promise.resolve({ data: books });
    });
    store.dispatch(actions.setSearchTerm("domain"));
    expect(store.getState().term).toEqual("domain");
    return store.dispatch(actions.fetchBooks()).then(() => {
      const state = store.getState();
      expect(state.term).toEqual("domain");
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8080/books?q=domain`
      );
    });
  });

  it("Fetches a book from remote", () => {
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books[0] }));
    return store.dispatch(actions.fetchABook(1)).then(() => {
      const state = store.getState();
      expect(state.book).toEqual(books[0]);
    });
  });
});
