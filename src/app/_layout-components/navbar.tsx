import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export function Navbar() {
  return (
    <header className={styles.sticky}>
      <nav className='nav-container'>
        <Link href='/'>
          <div className={styles.logo}>Билетопоиск</div>
        </Link>
        <Image src='icons/cart.svg' alt='' width={24} height={24} />
      </nav>
    </header>
  );
}
