import "@/app/globals.css";
import { Suspense } from "react";
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 

  return (
    <html lang="en">  
      <body className="w-full h-screen flex flex-col items-center">
        <Suspense fallback={<div>Loading...</div>}> {/* Suspense boundary */}
          {children}
        </Suspense>
      </body>
    </html>
  );
}
