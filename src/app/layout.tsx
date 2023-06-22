import "./globals.css";
import { Roboto } from "next/font/google";

import { Navbar, Footer } from "./_layout-components";

const roboto = Roboto({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Билетопоиск",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ru'>
      <body className={roboto.className}>
        <Navbar />
        <main className='content'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
