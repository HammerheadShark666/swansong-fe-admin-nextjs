import { Metadata } from "next";
import AlbumsContainer from "../components/albums-container";

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