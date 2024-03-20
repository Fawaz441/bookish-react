import { Typography } from "@material-ui/core";
import BookListContainer from "./BookList/BookListContainer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BookDetailContainer from "./BookDetail/BookDetailContainer";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <BookListContainer />, index: true },
    { path: "/books/:id", element: <BookDetailContainer /> },
  ]);
  return (
    <div>
      <Typography variant="h2" component="h2" data-test="heading">
        Bookish
      </Typography>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
