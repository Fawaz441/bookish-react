import axios from "axios";

const books = [
  { name: "Refactoring", id: 1 },
  { name: "Domain-driven design", id: 2 },
  { name: "Building Microservices", id: 3 },
];

const goToApp = () => {
  cy.visit("http://127.0.0.1:3000");
};

const gotoNthBookInTheList = (number) => {
  goToApp();
  cy.get("div.book-item").contains("View Details").eq(number).click();
};

export const composeReview = (name, content) => {
  cy.get('input[name="name"]').type(name);
  cy.get('textarea[name="content"]').type(content);
  cy.get('button[name="submit"]').click();
};

export const checkReview = () => {
  cy.get('div[data-test="reviews-container"] .review').should(
    "have. length",
    1
  );
};

describe("Bookish Application", function () {
  // this.afterEach(async () => {
  //   try {
  //     return await axios.delete("http://127.0.0.1:8080/books?_cleanup=true");
  //   } catch (err) {
  //     return err;
  //   }
  // });
  // this.beforeEach(() => {
  //   return books.map((item) =>
  //     axios.post("http://127.0.0.1:8080/books", item, {
  //       headers: { "Content-Type": "application/json" },
  //     })
  //   );
  // });
  // it("Visits the bookish", function () {
  //   goToApp();
  //   cy.get("h2[data-test='heading']").contains("Bookish");
  // });

  // it("Shows a book list", () => {
  //   cy.visit("http://127.0.0.1:3000");
  //   cy.get('div[data-test="book-list"]').should("exist");
  //   cy.get("div.book-item").should((books) => {
  //     expect(books).to.have.length(3);
  //     const titles = [...books].map((x) => x.querySelector("h2").innerHTML);
  //     expect(titles).to.deep.equal([
  //       "Refactoring",
  //       "Domain-driven design",
  //       "Building Microservices",
  //     ]);
  //   });
  // });

  // it("Goes to the detail page", () => {
  //   cy.visit("http://127.0.0.1:3000");
  //   cy.get("div.book-item").contains("View Details").eq(0).click();
  //   cy.url().should("include", "books/1");
  //   cy.get("h2.book-title").contains("Refactoring");
  // });

  // it("searches for a title", () => {
  //   cy.visit("http://127.0.0.1:3000");
  //   cy.get("div.book-item").should("have.length", books.length);
  //   cy.get('[data-test="search"] input').type("design");
  //   cy.get("div.book-item").should("have.length", 1);
  //   cy.get("div.book-item").eq(0).contains("Domain-driven design");
  // });

  it("Write a review for a book", () => {
    gotoNthBookInTheList(0);
    composeReview("Juntao Qiu", "Excellent work!");
    checkReview();
    // cy.get('input[name="name"]').type("Juntao Qiu");
    // cy.get('textarea[name="content"]').type("Excellent work!");
    // cy.get('button[name="submit"]').click();
    // cy.get('div[data-test="reviews-container"] .review').should(
    //   "have.length",
    //   1
    // );
  });
});
