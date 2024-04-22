import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { Store } from "./store/Store";
import Movie from "./Movie";
import Movies from "./Movies";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DeleteMovie from "./DeleteMovies";
import { loader as deleteMovieLoader } from "./DeleteMovies";
const router = createBrowserRouter([
  
      {
        path: "/",
        element: <Movies />,
      },
      {
        path: "movie/:id",
        element: <Movie />,
      },
      {
        path: "deleteMovie/:id",
        element: <DeleteMovie />,
        loader:deleteMovieLoader
      },
   
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />  
    </Provider>{" "}
 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
