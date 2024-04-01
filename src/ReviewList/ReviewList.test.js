import ReviewList from "./ReviewList";
import React from "react";
import { render } from "@testing-library/react";

describe("ReviewList", () => {
  it("renders an empty list", () => {
    const props = {
      reviews: [],
    };
    const container = render(<ReviewList {...props} />);
    const reviews = container.getByTestId("reviews-container");
    expect(reviews).toBeInTheDocument();
  });

  it("renders a list when data is passed", () => {
    const props = {
      reviews: [
        {
          name: "Juntao",
          date: "2018/06/21",
          content: "Excellent work, really impressed by your efforts",
        },
        { name: "Abruzzi", date: "2018/06/22", content: "What a great book" },
      ],
    };
    const { container } = render(<ReviewList {...props} />);
    const reviews = container.querySelectorAll(
      '[data-testid="reviews-container"] .review'
    );
    expect(reviews.length).toBe(2);
    expect(reviews[0].innerHTML).toEqual("Juntao");
  });
});
