import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Context from "./context/Context";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ダイエット用！筋トレ、体重",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={noto.className}>
        <Context>{children}</Context>
      </body>
    </html>
  );
}
