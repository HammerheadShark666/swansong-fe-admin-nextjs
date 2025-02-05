import "@/app/globals.css";
 
import {  Philosopher, Raleway, Open_Sans } from 'next/font/google' 
export const philosopher = Philosopher({ weight: "400", display: 'swap', subsets: ['latin'] }); 
export const raleway = Raleway({ weight: "400", display: 'swap', subsets: ['latin'] }); 
export const openSans = Open_Sans({ weight: "400", display: 'swap', subsets: ['latin'] }); 
 
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 

  return (    
    <main className="flex-1 w-full md:w-[90%] lg:w-[76%] pl-4 pr-4 pt-2">    
      <div className="flex justify-center items-center h-screen">    
        {children}   
      </div>      
    </main>       
  );
}