import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "films",
  initialState: {
    genres: ["action", "comedy", "horror", "drama", "biography"],

    actors: [
      { id: 1001, name: "monica belucci" },
      { id: 1002, name: "brad pitt" },
      { id: 1003, name: "margot robbie" },
      { id: 1004, name: "ali sadeghi" },
      { id: 1005, name: "adrian broody" },
    ],

    directors: [
      { id: 2001, name: "abbas kiarostami" },
      { id: 2002, name: "david fintcher" },
      { id: 2003, name: "stanley kubtick" },
      { id: 2004, name: "alfred hitchcock" },
    ],

    movies: [
      {
        id: 3001,
        name: "city of god",
        director: "2002",
        actors: [1003, 1005],
        genres: ["comedy", "action"],
      },
      {
        id: 3002,
        name: "into the wild",
        director: "2001",
        actors: [1004, 1005, 1001],
        genres: ["drama", "horror"],
      },
      {
        id: 3003,
        name: "what may dream come",
        director: "2004",
        actors: [1002, 1003],
        genres: ["horror", "comedy"],
      },
      {
        id: 3004,
        name: "red thin line",
        director: "2003",
        actors: [1001, 1002, 1003],
        genres: ["biography", "action"],
      },
    ],

    nextId: 3005,
    mvs: { id: 0, name: "", director: "", actors: [], genres: [] },
    DirNextId: 2005,
    
    ActNextId: 1006,
  },
  reducers: {
    addMov: (state, action) => {
      console.log(action.payload);
      if (state.mvs.id == 0) {
        state.nextId = state.nextId + 1;
        state.movies = [...state.movies, action.payload];
      } else {
        let nstd = state.movies.map((tx) => {
          if (tx.id == state.mvs.id) {
            return {
              id: state.mvs.id,
              name: action.payload.name,
              director: action.payload.director,
              actors: action.payload.actors,
              genres: action.payload.genres,
            };
          } else {
            return tx;
          }
        });
        return { ...state, movies: nstd };
      }
    },
    delMov: (state, action) => {
      let nstd = state.movies.filter((tx) => tx.id != action.payload);
      return { ...state, movies: nstd };
    },
    editMov: (state, action) => {
      state.mvs = state.movies.find((stf) => {
        return stf.id == action.payload;
      });
    },
    addDir: (state, action) => {
      const findedDir = state.directors.find(
        (dir) => dir.name === action.payload.name
      );
      if (!findedDir) {
        state.DirNextId = state.DirNextId + 1;
        state.directors = [...state.directors, action.payload];
      }
    
    },
    addGen: (state, action) => {
      const findedGen = state.genres.find(
        (gen) => 
         gen === action.payload
      );
      if (!findedGen) {
       
        state.genres = [...state.genres, action.payload];
      }
    },
    addAct: (state, action) => {
      
      const findedAct = state.actors.find(
        (act) => act.name === action.payload.name
      );
      if (!findedAct) {
        state.ActNextId = state.ActNextId + 1;
        state.actors = [...state.actors, action.payload];
      }
      console.log(state.actors);
    },
  },
});

export const dataGen = (state) => state.films.genres;
export const dataAct = (state) => state.films.actors;
export const dataDir = (state) => state.films.directors;
export const dataMov = (state) => state.films.movies;
export const nextId = (state) => state.films.nextId;
export const mvs = (state) => state.films.mvs;
export const DirNextId = (state) => state.films.DirNextId;
export const ActNextId = (state) => state.films.ActNextId;

export const { addMov } = movieSlice.actions;
export const { delMov } = movieSlice.actions;
export const { editMov } = movieSlice.actions;
export const { addDir } = movieSlice.actions;
export const { addGen} = movieSlice.actions;
export const { addAct } = movieSlice.actions;

export default movieSlice.reducer;
