import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import BookDetailContainer from "./BookDetailContainer";
import { Provider } from "react-redux";
import store from "../store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const renderWithProvider = (component) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

describe("BookDetailContainer", () => {
  it("renders", async () => {
    const { findByText } = renderWithProvider(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetailContainer />} />
        </Routes>
      </MemoryRouter>
    );
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:8080/books/1").reply(200, {
      name: "Acceptance tests driven development with React",
      id: 1,
    });
    setTimeout(async () => {
      const book = await findByText(
        "Acceptance tests driven development with React"
      );
      expect(book).toBeInTheDocument();
    }, 1000);
  });
});
