import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRemoteService } from "../hooks";
import BookDetail from "./BookDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchABook } from "../redux/actions/actions";

const BookDetailContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { book, loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchABook(id));
  }, []);

  return <BookDetail book={book} loading={loading} />;
};

export default BookDetailContainer;
