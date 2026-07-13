import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import MovieModal from "./components/modal/MovieModal";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "quiz", element: <Quiz /> },
      {
        path: "result/:mbtiType",
        element: <Result />,
        children: [{ path: "movie/:movieId", element: <MovieModal /> }],
      },
    ],
  },
]);
