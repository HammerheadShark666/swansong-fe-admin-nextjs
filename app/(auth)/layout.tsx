import "@/app/globals.css";
  
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