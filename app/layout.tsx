import type { Metadata } from "next";
import { SamePageRefresh } from "../components/same-page-refresh";
import "./globals.css";

export const metadata: Metadata = {
  title: "Immortal Cyber Teams",
  description: "Imagine a limitless cybersecurity team, available within seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><SamePageRefresh/>{children}</body></html>;
}
