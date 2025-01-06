import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer"
import { Ibarra_Real_Nova, Bellefair, Philosopher, Poppins, Raleway } from 'next/font/google'
import Navigation from "./components/navigation/navigation";   

export const ibarraRealNova = Ibarra_Real_Nova({ weight: "400", display: 'swap', subsets: ['latin'] });
export const bellefair = Bellefair({ weight: "400", display: 'swap', subsets: ['latin'] }); 
export const philosopher = Philosopher({ weight: "400", display: 'swap', subsets: ['latin'] }); 
export const poppins = Poppins({ weight: "400", display: 'swap', subsets: ['latin'] }); 
export const raleway = Raleway({ weight: "400", display: 'swap', subsets: ['latin'] }); 
 
export const metadata: Metadata = {
  title: "Swansong",
  description: "Swansong music website", 
}; 
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 

  return (
    <html lang="en">
      <body className="w-full flex flex-col min-h-screen"> 
        <header>
          <Navigation />
        </header>
        <main className="w-full flex-grow flex"> 
          <div className="flex w-full justify-center flex-1 bg-neutral-700">
            <div className="w-full md:w-[90%] lg:w-[66%] px-4 bg-black mb-4 p-2 flex flex-col"> 
              {children}
            </div>
          </div>
        </main>       
        <Footer></Footer>  
      </body> 
    </html>
  );
}
