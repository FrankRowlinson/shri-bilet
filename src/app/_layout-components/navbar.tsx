import Link from "next/link";

import { CartIcon } from "./";
import styles from "./navbar.module.css";

export function Navbar() {
  return (
    <header className={styles.sticky}>
      <nav className='nav-container'>
        <Link href='/'>
          <div className={styles.logo}>Билетопоиск</div>
        </Link>
        <CartIcon />
      </nav>
    </header>
  );
}
