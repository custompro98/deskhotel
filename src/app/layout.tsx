import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { auth, signIn, signOut } from "@/lib/authentication";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Desk Hotel",
  description: "Run your office away from home.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen`}>
        <header>
          <nav className="flex flex-row justify-between h-16 p-2 items-center">
            <div className="flex flex-row justify-start">
              <Link href="/">Home</Link>
            </div>
            <div className="flex flex-row justify-end">
              {session ? (
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                  className="p-1"
                >
                  <button className="text-sm border border-gray-300 p-1 rounded">
                    Sign out
                  </button>
                </form>
              ) : (
                <form
                  action={async () => {
                    "use server";
                    await signIn("google", { redirectTo: "/" });
                  }}
                >
                  <button className="text-sm border border-gray-300 p-1 rounded">
                    Sign in
                  </button>
                </form>
              )}
            </div>
          </nav>
        </header>
        <main className="p-2 flex-grow">{children}</main>
        <footer className="p-2 mx-auto">
          <Link href="https://github.com/custompro98">custompro98</Link>
        </footer>
      </body>
    </html>
  );
}
