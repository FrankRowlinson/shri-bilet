"use client";

import classNames from "classnames";

import { SearchActionKind } from "../page";

import styles from "./filter.module.css";
import Input from "../_shared-components/input";
import Select from "../_shared-components/select";
import { GENRES } from "@/constants";

type FilterProps = {
  search: SearchState;
  dispatch: React.Dispatch<SearchAction>;
};

export function Filter({ search, dispatch }: FilterProps) {
  return (
    <div className={classNames(styles.container, "paper")}>
      <div className={classNames(styles.filters, "spaced")}>
        <h4>Фильтры поиска</h4>
        <Select
          label='Жанр'
          placeholder='Выберите жанр'
          value={search.genre}
          setValue={(value) =>
            dispatch({
              type: SearchActionKind.SEARCH_BY_GENRE,
              payload: value,
            })
          }
        >
          {Object.entries(GENRES).map((genre) => {
            return (
              <Select.Option
                key={genre[0]}
                id={genre[0]}
                displayName={genre[1]}
              />
            );
          })}
        </Select>
        <Input
          value={search.title}
          label='Название'
          placeholder='Введите название'
          onChange={(e) => {
            dispatch({
              type: SearchActionKind.SEARCH_BY_NAME,
              payload: e.currentTarget.value,
            });
          }}
        />
      </div>
    </div>
  );
}
