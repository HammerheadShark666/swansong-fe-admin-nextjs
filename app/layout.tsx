import "./globals.css";
import Footer from "./components/footer"
import {  Philosopher, Raleway, Open_Sans } from 'next/font/google'
import Navigation from "./components/navigation/navigation";   
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
      <body className="w-full h-screen flex flex-col items-center">  
        <header className="h-25 w-full">
          <Navigation />
        </header>
        <main className="flex-1 w-full md:w-[90%] lg:w-[66%] pl-4 pr-4 pt-2 bg-black">        
          {children}         
        </main>       
        <Footer></Footer>  
      </body> 
    </html>
  );
}
