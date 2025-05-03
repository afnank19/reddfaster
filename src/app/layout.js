import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers"


const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"]
})

export const metadata = {
  title: "Reddfaster",
  description: "Browse reddit images hyper fast",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
