import "~/styles/globals.css";

import { type Metadata } from "next";
import { Outfit } from "next/font/google";

export const metadata: Metadata = {
  title: "Krishi Bandhu - Farmer Dashboard",
  description: "Krishi Bandhu: Companion for Karnataka Farmers",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
