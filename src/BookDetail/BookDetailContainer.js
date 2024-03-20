import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRemoteService } from "../hooks";
import BookDetail from "./BookDetail";

const BookDetailContainer = () => {
  const { id } = useParams();
  const { data } = useRemoteService(`http://localhost:8080/books/${id}`, {});
  return <BookDetail book={data} />;
};

export default BookDetailContainer;
