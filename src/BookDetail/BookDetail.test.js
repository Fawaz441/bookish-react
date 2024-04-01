import { render } from "@testing-library/react";
import BookDetail from "./BookDetail";

describe("BookDetail", () => {
  it("renders title", () => {
    const props = {
      book: {
        name: "Refactoring",
      },
    };
    const { container } = render(<BookDetail {...props} />);
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
    const { container } = render(<BookDetail {...props} />);
    const description = container.querySelector("p.book-description");
    expect(description.innerHTML).toEqual(props.book.description);
  });

  it("displays the book name when no description is not provided", () => {
    const props = {
      book: {
        name: "Refactoring",
      },
    };

    const { container } = render(<BookDetail {...props} />);
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
    const { container } = render(<BookDetail {...props} />);
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
    const { container } = render(<BookDetail {...props} />);
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
});
