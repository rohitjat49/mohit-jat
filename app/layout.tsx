import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohit Jat — Scientist, Builder & Entrepreneur",
  description:
    "Mohit Jat — exploring science, product development, entrepreneurship and ideas that create meaningful impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}