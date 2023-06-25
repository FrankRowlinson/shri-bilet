import Link from "next/link";

import { CartIcon } from "./";
import styles from "./navbar.module.css";

export function Navbar() {
  return (
    <header className={styles.sticky}>
      <nav className='nav-container'>
        <Link href='/'>
          <h1>Билетопоиск</h1>
        </Link>
        <CartIcon />
      </nav>
    </header>
  );
}
