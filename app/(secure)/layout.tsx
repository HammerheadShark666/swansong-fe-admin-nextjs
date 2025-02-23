import { Suspense } from "react";
import Footer from "../components/footer";
import Navigation from "../components/navigation/navigation";
import "@/app/globals.css";

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
        <Suspense fallback={<div>Loading...</div>}> {/* Suspense boundary */}     
        {children}     
        </Suspense>    
      </main>       
      <Footer></Footer>  
    </>
  );
}