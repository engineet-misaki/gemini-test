import type { Metadata } from "next";
import "./globals.css";
import { TodoProvider } from "@/contexts/TodoContext";

export const metadata: Metadata = {
  title: "TODO App",
  description: "A simple TODO application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <TodoProvider>{children}</TodoProvider>
      </body>
    </html>
  );
}
