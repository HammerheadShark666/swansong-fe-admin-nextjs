
import Footer from "@/app/components/footer";
import Navigation from "@/app/components/navigation/navigation";
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
    <>
      <header className="h-25 w-full">
        <Navigation />
      </header>
      <main className="flex-1 w-full md:w-[90%] lg:w-[66%] pl-4 pr-4 pt-2 bg-black">        
        {children}         
      </main>       
      <Footer></Footer>  
    </>
  );
}