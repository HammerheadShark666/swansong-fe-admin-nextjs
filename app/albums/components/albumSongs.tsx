'use client'

import { useEffect, useState } from "react";
import AlbumSongForm from "./albumSongForm";
import { AlbumSong } from "@/app/types/albumSong";
import { getAlbumSongsTotalLength } from "@/app/lib/albumHelper";

interface IProps {
  songs: AlbumSong[];
  albumId: number;
}

function sortAlbumSongs(albumSongs: AlbumSong[]) 
{
  const sortedAlbumSongs = [...albumSongs].sort((a, b)=> {
    if (a.side === b.side)
      return a.order < b.order ? -1 : 1;
    else
      return a.side < b.side ? -1 : 1;    
  })

  return sortedAlbumSongs;
}
  
export default function AlbumSongs({songs, albumId}: IProps) {
   
  const [albumSongs, setAlbumSongs] = useState<AlbumSong[]>(songs);
  const [albumSong, setAlbumSong] = useState<AlbumSong>(); 
  const [mode, setMode] = useState<string>("add");
  const [selectedRow, setSelectedRow] = useState<number | null>(null);  
   
  useEffect(() => { 
 
    const sortedAlbumSongs = sortAlbumSongs([...albumSongs]) ;
    if (JSON.stringify(albumSongs) !== JSON.stringify(sortedAlbumSongs))
      setAlbumSongs(sortedAlbumSongs);
    
  }, [albumSongs]);   

  const addSongToAlbumSongList = (albumSong: AlbumSong) => {
    setAlbumSongs((prevItems) => [...prevItems, albumSong]); 
    setSelectedRow(null);
  };

  const updateSongInAlbumSongList  = (albumSong: AlbumSong) => {
    setAlbumSongs((prevItems) =>
      prevItems.map((item) => (item.id === albumSong.id ? albumSong : item))
    );
    setAlbumSong(undefined);
    setSelectedRow(null);
  };  

  const removeSongFromList  = (id: number) => {

    const updatedAlbumSongsList = albumSongs.filter(obj => obj.id !== id);

    if (JSON.stringify(albumSongs) !== JSON.stringify(updatedAlbumSongsList))
      setAlbumSongs(updatedAlbumSongsList);
  }

  const handleRowClick = (albumSong: AlbumSong) => {
     setAlbumSong(albumSong);
     setMode("edit");
     setSelectedRow(albumSong.id);
  }; 

  return(
    <>
      <div className="grid grid-cols-12">
        <div className="grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5">     
          <table className="table-auto text-left w-full">
            <thead>
              <tr className="p-5 pt-0 text-xs">
                <th className="py-2 pl-18 pr-4 pt-0">Title</th>
                <th className="py-2 pl-4 pr-4 pt-0 text-right">Length</th> 
              </tr>
            </thead>        
            <tbody> 
              {albumSongs.map((albumSong) => (
                <tr key={albumSong.id} onClick={() => handleRowClick(albumSong)} 
                className={`text-xs border-b border-slate-600 hover:bg-slate-300 hover:cursor-pointer ${
                  selectedRow === albumSong.id ? "bg-blue-100" : ""
                }`}>                  
                <td className="">{albumSong.song.title}</td>
                <td className="py-2 text-right pl-4 pr-4">{albumSong.song.length}</td>           
              </tr>
              ))}    
              <tr className="text-sm">
                <td className="">Total Length</td>
                <td className="py-2 text-right pl-4 pr-4">{getAlbumSongsTotalLength(albumSongs)}</td>
              </tr>     
            </tbody>
          </table>
        </div>
        <div className="grid-cols-12 col-span-12 md:grid-cols-7 md:col-span-7 p-2 md:p-4 md:pl-6 bg-stone-50 md:ml-4"> 
          <AlbumSongForm albumId={albumId} albumSong={albumSong} mode={mode} setMode={setMode} setSelectedRow={setSelectedRow} 
                  addSongToAlbumSongList={addSongToAlbumSongList} updateSongInAlbumSongList={updateSongInAlbumSongList} removeSongFromList={removeSongFromList}></AlbumSongForm>
        </div>
      </div>  
    </>
  )   
}