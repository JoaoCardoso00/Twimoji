import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twimoji",
  description: "Twitter but with emojis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${inter.className} bg-gray-100`}>{children}</body>
      </html>
    </AuthProvider>
  );
}
