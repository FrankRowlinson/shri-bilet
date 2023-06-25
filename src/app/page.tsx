"use client";

import { useReducer } from "react";
import { Filter, MovieList } from "./_page-components";
import styles from "./page.module.css";

const initialState: SearchState = {
  title: "",
  genre: "",
  cinema: "",
};

export enum SearchActionKind {
  SEARCH_BY_NAME = "SEARCH_BY_NAME",
  SEARCH_BY_CINEMA = "SEARCH_BY_CINEMA",
  SEARCH_BY_GENRE = "SEARCH_BY_GENRE",
}

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  const { type, payload } = action;
  switch (type) {
    case SearchActionKind.SEARCH_BY_NAME: {
      return { ...state, title: payload };
    }
    case SearchActionKind.SEARCH_BY_CINEMA: {
      return { ...state, cinema: payload };
    }
    case SearchActionKind.SEARCH_BY_GENRE: {
      return { ...state, genre: payload };
    }
    default:
      return state;
  }
}

export default function Main() {
  const [search, dispatch] = useReducer(searchReducer, initialState);
  return (
    <div className={styles.container}>
      <Filter search={search} dispatch={dispatch} />
      <MovieList search={search} />
    </div>
  );
}
