import classNames from "classnames";
import styles from "./button.module.css";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  variant: "primary" | "outlined";
  className?: string;
};

export default function Button({
  children,
  variant,
  onClick,
  className,
}: Props) {
  const buttonClass = classNames(styles.button, styles[variant], className);

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
