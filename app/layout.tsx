import "@/app/globals.css";
import {  Philosopher, Raleway, Open_Sans } from 'next/font/google' 
export const philosopher = Philosopher({ weight: "400", display: 'swap', subsets: ['latin'] }); 
export const raleway = Raleway({ weight: "400", display: 'swap', subsets: ['latin'] }); 
export const openSans = Open_Sans({ weight: "400", display: 'swap', subsets: ['latin'] }); 
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 

  return (
    <html lang="en">  
      <body className="w-full h-screen flex flex-col items-center">{children}</body>
    </html>
  );
}
