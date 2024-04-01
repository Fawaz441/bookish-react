/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/render-result-naming-convention */
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import BookListContainer from "./BookListContainer";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import { Router } from "react-router";
import configureStore from "redux-mock-store";
import { fetchABook } from "../redux/actions/actions";
import { thunk } from "redux-thunk";

const mockStore = configureStore([thunk]);

const renderWithProvider = (component) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

describe("BookListContainer", () => {
  //   it("renders", async () => {
  //     const mock = new MockAdapter(axios);
  //     mock.onGet("http://localhost:8080/books?q=").reply(200, [
  //       { name: "Refactoring", id: 1 },
  //       { name: "Acceptance tests driven development with React", id: 2 },
  //     ]);
  //     const screen = renderWithProvider(<BookListContainer />);
  //     await waitFor(async () => {
  //       const book1 = await screen.findByText("Refactoring");
  //       const book2 = await screen.findByText(
  //         "Acceptance tests driven development with React"
  //       );
  //       expect(book1).toBeInTheDocument();
  //       expect(book2).toBeInTheDocument();
  //     });
  //   });

  it("Something went wrong", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:8080/books?q=").networkError();
    const screen = renderWithProvider(<BookListContainer />);
    const error = await screen.findByText("Error...");
    expect(error).toBeInTheDocument();
  });

  it("Fetches book by id", () => {
    const book = { id: 1, name: "Refactoring" };
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: book }));
    const store = mockStore({ list: { books: [], term: "" } });
    return store.dispatch(fetchABook(1)).then(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/books/1");
    });
  });
});
