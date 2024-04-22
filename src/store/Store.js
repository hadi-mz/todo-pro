import { configureStore } from "@reduxjs/toolkit";

import moviereducer from "./slices/MovieSlice";


export const Store = configureStore({
  reducer: {
    films: moviereducer,
 
  },
});
