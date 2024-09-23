import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import {AuthStateSync} from "./AuthStateSync"; // Adjust the path as needed

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SubCommunity",
  description: "This platform allows creators to build and manage their own community pages, where they can connect with their fans and offer exclusive content. Creators can set a monthly membership fee for users who wish to join their community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthStateSync/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
