"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bona_Nova_SC } from 'next/font/google'

const bonaNovaSc = Bona_Nova_SC({ weight: "400", display: 'swap', subsets: ['latin'] });

export default function Logo() {

  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  const [showButton, setShowButton] = useState(false);

  const changeNavButton = () => {
    if (window.scrollY >= 400 && window.innerWidth < 768) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavButton);
  }, []);

  return (
    <>             
      <div className="col-span-12 grid-cols-12 text-center sm:grid-cols-2 sm:col-span-2 md:grid-cols-4 md:col-span-4 lg:grid-cols-2 lg:col-span-2">
        <Link className="col-span-12 pt-1 md:pt-0 lg:pt-1" href="/" style={{ display: showButton ? "none" : "block" }}>
          <div className="grid grid-cols-12">
            <div className="col-span-2 grid-cols-2 md:col-span-2 md:grid-cols-2 flex justify-left">
              <Image alt="SwanSong" src={`${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}site-images/SwanSong.jpg`} width={width < 1024 ? "150" : "250"}
                height={width < 1024 ? "45" : "74"} sizes="100vw" style={{ width: '72px', height: 'auto' }} />   
            </div>
            <div className="col-span-10 grid-cols-10 md:col-span-10 md:grid-cols-10">
              <h1 className={`${bonaNovaSc.className} text-white text-left text-4xl`}>SwanSong</h1>
            </div>
          </div>
        </Link>
      </div>        
    </>
  );
};