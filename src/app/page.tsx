"use client";

import { useReducer } from "react";
import { Filter, MovieList } from "./_components/";
import styles from "./page.module.css";

enum SearchActionKind {
  SEARCH_BY_NAME = "SEARCH_BY_NAME",
  SEARCH_BY_CINEMA = "SEARCH_BY_CINEMA",
  SEARCH_BY_GENRE = "SEARCH_BY_GENRE",
}
interface SearchAction {
  type: string;
  payload: string;
}

const initialState: SearchState = {
  title: "",
  genre: "",
  cinema: "",
};

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
      <Filter>
        <h4>Фильтры поиска</h4>
        <input
          value={search.title}
          onChange={(e) => {
            dispatch({
              type: SearchActionKind.SEARCH_BY_NAME,
              payload: e.target.value,
            });
          }}
        />
      </Filter>
      <MovieList search={search} />
    </div>
  );
}
