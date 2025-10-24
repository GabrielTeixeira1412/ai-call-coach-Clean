import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Call Coach",
  description: "Simulator, Feedback, Manager-Insights"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-gray-50">
        <header className="flex items-center gap-3 p-5">
          <Image src="/logo-light.svg" alt="AI Call Coach" width={32} height={32} />
          <Link href="/" className="text-xl font-bold">AI CALL COACH</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
