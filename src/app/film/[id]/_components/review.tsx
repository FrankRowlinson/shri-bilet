import classNames from "classnames";

import styles from "./review.module.css";
import Image from "next/image";

type Props = {
  review: Review;
};

export default function Review({ review }: Props) {
  return (
    <article className={classNames("paper", styles.container)}>
      <div className={styles.picture}>
        <Image src='/icons/photo.svg' width={32} height={32} alt='' />
      </div>
      <div className={classNames(styles.content)}>
        <header className={styles.header}>
          <h4>{review.name}</h4>
          <p className={styles.rating}>
            Оценка: <strong>{review.rating}</strong>
          </p>
        </header>
        <div>{review.text}</div>
      </div>
    </article>
  );
}
