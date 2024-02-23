"use client";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <head>
        <title>BH Dashboard</title>
      </head>
      <body className={`${dm_sans.className} bg-[#f8fafb] `}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="flex flex-col sm:flex-row min-h-screen">
          {pathname === "/" ? null : (
            <>
              <Sidebar />
              <div className="flex sm:hidden h-28" />
            </>
          )}

          {children}
        </div>
      </body>
    </html>
  );
}
