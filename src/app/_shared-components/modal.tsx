"use client";

import { createContext, useContext } from "react";
import Image from "next/image";
import classNames from "classnames";

import Portal from "../_hocs/portal";

import styles from "./modal.module.css";
import { Button } from "./";

interface ModalProps {
  onAccept: () => void;
  onDecline: () => void;
  children: React.ReactNode;
}

type ModalActions = Omit<ModalProps, "children">;

const defaultValue = {
  onAccept: () => {},
  onDecline: () => {},
};

const ModalContext = createContext<ModalActions>(defaultValue);

function Modal({ onAccept, onDecline, children }: ModalProps) {
  return (
    <Portal selector='#modal'>
      <ModalContext.Provider value={{ onAccept, onDecline }}>
        <div className={styles.container} onClick={onDecline}>
          <div
            className={classNames("paper", "spaced", styles.window)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </div>
      </ModalContext.Provider>
    </Portal>
  );
}

Modal.Header = function Header({ children }: { children: React.ReactNode }) {
  const { onDecline } = useContext(ModalContext);
  return (
    <div className={styles.header}>
      <h3>{children}</h3>
      <Image
        onClick={() => onDecline()}
        src='/icons/close.svg'
        alt=''
        width={16}
        height={16}
      />
    </div>
  );
};

Modal.Content = function Content({ children }: { children: React.ReactNode }) {
  return <div className={styles.content}>{children}</div>;
};

type ActionProps = {
  acceptText: string;
  declineText: string;
};

Modal.Actions = function Actions({ acceptText, declineText }: ActionProps) {
  const { onAccept, onDecline } = useContext(ModalContext);
  return (
    <div className={styles.actions}>
      <Button
        variant='primary'
        className={styles.left}
        onClick={() => onAccept()}
      >
        {acceptText}
      </Button>
      <Button variant='outlined' onClick={() => onDecline()}>
        {declineText}
      </Button>
    </div>
  );
};

export { Modal };
