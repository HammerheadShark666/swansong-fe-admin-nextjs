import Image from "next/image";  
import { Bona_Nova_SC } from 'next/font/google'

const bonaNovaSc = Bona_Nova_SC({ weight: "400", display: 'swap', subsets: ['latin'] });
 
export default function TitleBar() {
  return (
      <>
        <div className="flex w-full bg-black">
          <Image alt="SwanSong" src={`${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}site-images/SwanSong.jpg`} width="150"
                          height="45" sizes="100vw" style={{ width: '72px', height: 'auto', margin: '2px 0px 4px 0px' }} />   
          <h1 className={`${bonaNovaSc.className} text-white text-left text-4xl mt-1`}>SwanSong</h1>
        </div>
      </>
    );
};