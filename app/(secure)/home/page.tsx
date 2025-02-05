import AlbumsContainer from "@/app/components/albums-container";
import { Metadata } from "next"; 

export const metadata:Metadata = {
  title: "Swansong",
  description: "Swansong music admin site"
}

export default async function Home() { 

  return (     
    <>
      <AlbumsContainer></AlbumsContainer> 
    </>
  );
}