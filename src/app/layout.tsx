import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Desk Hotel",
  description: "Run your office away from home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>
            <Link href="/">Home</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <Link href="https://github.com/custompro98">custompro98</Link>
        </footer>
      </body>
    </html>
  );
}
