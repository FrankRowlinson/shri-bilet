import { createContext, useContext, useState } from "react";
import classNames from "classnames";

import Portal from "../_hocs/portal";

import styles from "./select.module.css";
import Image from "next/image";

interface SelectProps extends React.PropsWithChildren {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  label: string;
}

type SelectContextType = {
  setValue: (value: string) => void;
};

const SelectContext = createContext<SelectContextType>({
  setValue: () => {},
});

function Select({
  placeholder,
  value,
  label,
  setValue,
  children,
}: SelectProps) {
  const [parentStyle, setParentStyle] = useState({});
  const [open, setOpen] = useState(false);

  const updateDropdownCoords = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const height = event.currentTarget.offsetHeight;
    const width = event.currentTarget.offsetWidth;
    setParentStyle({
      left: rect.x,
      top: rect.y + height + 4,
      width: `${width}px`,
    });
  };

  return (
    <SelectContext.Provider
      value={{
        setValue: (value) => {
          setValue(value);
          setOpen(false);
        },
      }}
    >
      <div className={styles.container}>
        <label className={styles.label}>{label}</label>
        <div
          className={classNames(styles.select, open && styles.open)}
          onClick={(event) => {
            updateDropdownCoords(event);
            setOpen((prev) => !prev);
          }}
        >
          {!!value ? (
            <div className={styles.value}>{value}</div>
          ) : (
            <div className={styles.placeholder}>{placeholder}</div>
          )}
          <Image
            src='icons/arrow.svg'
            alt=''
            width={20}
            height={20}
            className={classNames(styles.icon, open && styles.open)}
          />
        </div>
        {open && (
          <Portal selector='#dropdown'>
            <div
              className={classNames(styles.dropdown)}
              style={{ ...parentStyle }}
            >
              {children}
            </div>
          </Portal>
        )}
      </div>
    </SelectContext.Provider>
  );
}

Select.Option = function Option({
  id,
  displayName,
}: {
  id: string;
  displayName: string;
}) {
  const { setValue } = useContext(SelectContext);
  return (
    <div className={styles.option} onClick={() => setValue(id)}>
      {displayName}
    </div>
  );
};

export { Select };
