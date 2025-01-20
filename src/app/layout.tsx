import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { TasksProvider } from "./context/TasksContext";
import Middleware from "../../middlware";

export const metadata: Metadata = {
  title: "Taskly Adviser AI",
  description: "Taskly Adviser AI helps you manage tasks efficiently with smart guidance and personalized assistance.",
  keywords: "task management, AI assistant, productivity, smart tasks, personal organizer",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow"
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
