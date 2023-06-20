import Image from "next/image";

import styles from "./navbar.module.css";

export function Navbar() {
  return (
    <header className={styles.sticky}>
      <nav className='nav-container'>
        <div className={styles.logo}>Билетопоиск</div>
        <Image src='icons/cart.svg' alt='' width={32} height={32} />
      </nav>
    </header>
  );
}
