import React from "react";
import ReviewList from "../ReviewList/ReviewList";
import ReviewForm from "./ReviewForm";
const BookDetail = ({ book, loading }) => {
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div className="detail">
      <h2 className="book-title">{book.name}</h2>
      <p className="book-description">{book.description || book.name}</p>
      <ReviewForm id={book.id} />
      {book.reviews && <ReviewList reviews={book.reviews} />}
    </div>
  );
};
export default BookDetail;
