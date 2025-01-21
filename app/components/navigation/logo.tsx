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
      <Link className="flex flex-row items-center" href="/" style={{ display: showButton ? "none" : "block" }}>
        <Image alt="SwanSong" src={`${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}site-images/SwanSong.jpg`} width={width < 1024 ? "150" : "250"}
                height={width < 1024 ? "45" : "74"} sizes="100vw" style={{ width: '72px', height: 'auto', margin: '2px 0px 4px 0px' }} />   
        <h1 className={`${bonaNovaSc.className} text-white text-left text-4xl`}>SwanSong</h1>
      </Link> 
    </>
  );
};