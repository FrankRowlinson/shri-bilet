import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <nav className='nav-container'>
        <Link href='/questions'>Вопросы и ответы</Link>
        <Link href='/about'>О нас</Link>
      </nav>
    </footer>
  );
}
