import "./globals.css";
import { Roboto } from "next/font/google";

import { Navbar, Footer } from "./_layout-components";
import StoreProvider from "@/store/StoreProvider";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
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
    <StoreProvider>
      <html lang='ru'>
        <body className={roboto.className}>
          <div id='modal'></div>
          <div id='dropdown'></div>
          <Navbar />
          <main className='content'>{children}</main>
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
