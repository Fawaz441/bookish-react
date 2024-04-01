import React, { useState } from "react";
import ReviewList from "../ReviewList/ReviewList";
import { Button, TextField } from "@material-ui/core";
const BookDetail = ({ book, loading }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div className="detail">
      <h2 className="book-title">{book.name}</h2>
      <p className="book-description">{book.description || book.name}</p>
      <form noValidate autoComplete="off">
        <TextField
          label="Name"
          name="name"
          margin="normal"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          name="content"
          label="Content"
          margin="normal"
          variant="outlined"
          multiline
          rowsMax="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="contained" color="primary" name="submit">
          Submit
        </Button>
      </form>
      {book.reviews && <ReviewList reviews={book.reviews} />}
    </div>
  );
};
export default BookDetail;
