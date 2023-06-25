"use client";

import classNames from "classnames";

import { GENRES } from "@/constants";

import { SearchActionKind } from "../page";
import { Error, Input, Select } from "../_shared-components/";

import styles from "./filter.module.css";
import { useGetCinemasQuery } from "@/store/services/cinemasApi";

type FilterProps = {
  search: SearchState;
  dispatch: React.Dispatch<SearchAction>;
};

export function Filter({ search, dispatch }: FilterProps) {
  const { data: cinemas, isLoading, error } = useGetCinemasQuery();

  if (error) {
    <Error>Не удалось загрузить фильтры. Попробуйте снова</Error>;
  }

  return (
    <aside className={classNames(styles.container, "paper")}>
      <div className={classNames(styles.filters, "spaced")}>
        <h4>Фильтры поиска</h4>
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
        <Select
          label='Жанр'
          placeholder='Выберите жанр'
          value={search.genre ? GENRES[search.genre] : ""}
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
        <Select
          label='Кинотеатр'
          placeholder='Выберите кинотеатр'
          value={
            search.cinema && !!cinemas
              ? cinemas.filter(
                  (cinema: Cinema) => cinema.id === search.cinema
                )[0].name
              : ""
          }
          setValue={(value) =>
            dispatch({
              type: SearchActionKind.SEARCH_BY_CINEMA,
              payload: value,
            })
          }
        >
          {isLoading ? (
            <Select.Option id='' displayName='Кинотеатры загружаются...' />
          ) : (
            <>
              <Select.Option id='' displayName='Любой' />
              {cinemas?.map((cinema: Cinema) => {
                return (
                  <Select.Option
                    key={cinema.id}
                    id={cinema.id}
                    displayName={cinema.name}
                  />
                );
              })}
            </>
          )}
        </Select>
      </div>
    </aside>
  );
}
