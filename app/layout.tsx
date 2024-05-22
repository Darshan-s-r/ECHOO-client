import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <GoogleOAuthProvider clientId="914659849053-l1u7c0rcpl9hojpjig5qtaum03ev9if0.apps.googleusercontent.com">
        {children}
        </GoogleOAuthProvider>
        </body>
    </html>
  );
}
