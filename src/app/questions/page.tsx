"use client";

import { useState } from "react";
import Accordion from "./_page-components/accordion";
import classNames from "classnames";

import styles from "./page.module.css";

const questions = [
  {
    id: 1,
    title: "Что такое Билетопоиск?",
    content:
      "Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.",
  },
  {
    id: 2,
    title: "Какой компании принадлежит Билетопоиск?",
    content: "Компания Билетопоиск является частью экосистемы Яндекса.",
  },
  {
    id: 3,
    title: "Как купить билет на Билетопоиск?",
    content: "Я сам не знаю, если честно.",
  },
  {
    id: 4,
    title: "Как оставить отзыв на Билетопоиск?",
    content:
      "Воспользоваться формой отправки отзыва на странице интересующего фильма.",
  },
];

export default function Questions() {
  const [active, setActive] = useState<number | undefined>();
  return (
    <section className='spaced'>
      <header className={classNames("paper", styles.header)}>
        <h1>Вопросы и ответы</h1>
      </header>
      {questions.map((q) => {
        return (
          <Accordion
            key={q.id}
            title={q.title}
            setActive={setActive}
            active={active}
            id={q.id}
          >
            {q.content}
          </Accordion>
        );
      })}
    </section>
  );
}
