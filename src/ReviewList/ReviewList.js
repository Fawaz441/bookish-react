import React from "react";

const ReviewList = ({ reviews }) => {
  return (
    <div data-testid="reviews-container">
      {(reviews || []).map((review, index) => (
        <div key={index} className="review">
          {review.name}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
