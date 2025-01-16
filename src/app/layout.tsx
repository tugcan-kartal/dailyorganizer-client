import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { TasksProvider } from "./context/TasksContext";
import Middleware from "../../middlware";

export const metadata: Metadata = {
  title: "Daily Organizer AI",
  description: "Daily organizer with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TasksProvider>
        <body>
          <Middleware />
          {children}
          <Toaster />
        </body>
      </TasksProvider>
    </html>
  );
}
