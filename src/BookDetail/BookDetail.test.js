import { render } from "@testing-library/react";
import BookDetail from "./BookDetail";
import axios from "axios";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { saveReview } from "../redux/actions/actions";
import { Provider } from "react-redux";
import store from "../store";

const mockStore = configureStore([thunk]);

const renderWithProvider = (component) => {
  return {
    ...renderWithProvider(<Provider store={store}>{component}</Provider>),
  };
};

afterEach(() => {
  return axios
    .delete("http://localhost:8080/books?_cleanup=true")
    .catch((err) => err);
});

describe("BookDetail", () => {
  it("renders title", () => {
    const props = {
      book: {
        name: "Refactoring",
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const title = container.querySelector("h2");
    expect(title.innerHTML).toEqual(props.book.name);
  });

  it("renders description", () => {
    const props = {
      book: {
        name: "Refactoring",
        description: `Martin Fowler's Refactoring defined core ideas and
      techniques that hundreds of thousands of developers have used to improve their software.`,
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const description = container.querySelector("p.book-description");
    expect(description.innerHTML).toEqual(props.book.description);
  });

  it("displays the book name when no description is not provided", () => {
    const props = {
      book: {
        name: "Refactoring",
      },
    };

    const { container } = renderWithProvider(<BookDetail {...props} />);
    const bookTitle = container.querySelector("h2.book-title");
    const bookDescription = container.querySelector("p.book-description");
    expect(bookTitle.innerHTML).toEqual(props.book.name);
    expect(bookDescription.innerHTML).toEqual(props.book.name);
  });

  it("renders reviews", () => {
    const props = {
      book: {
        name: "Refactoring",
        description:
          "Martin Fowler’s Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.",
        reviews: [
          {
            name: "Juntao",
            date: "2018/06/21",
            content: "Excellent work, really impressed by your efforts",
          },
        ],
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const reviews = container.querySelectorAll(
      '[data-testid="reviews-container"] .review'
    );
    expect(reviews.length).toBe(1);
    expect(reviews[0].innerHTML).toEqual("Juntao");
  });

  it("renders review form", () => {
    const props = {
      book: {
        name: "Refactoring",
        description:
          "Martin Fowler’s Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.",
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const form = container.querySelector("form");
    const nameInput = form.querySelector('input[name="name"]');
    const contentTextArea = container.querySelector(
      'textarea[name= "content"]'
    );
    const submitButton = container.querySelector('button[name="submit"]');

    expect(form).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(contentTextArea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("Saves a review for a book", () => {
    const review = {
      name: "Abdulsalam Fawaz",
      content: "Excellent work",
    };
    axios.post = jest.fn().mockImplementation(() => Promise.resolve({}));
    const store = mockStore({ books: [], term: "" });
    return store.dispatch(saveReview(1, review)).then(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `http://localhost:8080/books/1/reviews`,
        review
      );
    });
  });
});
