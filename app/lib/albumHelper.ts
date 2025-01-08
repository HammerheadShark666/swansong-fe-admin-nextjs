import { AlbumSong } from "../types/albumSong";

export function getAlbumSongsTotalLength(albumSongs: AlbumSong[]) {  
  
  let sum = "";

  if(albumSongs.length > 0) {

      let minutes = 0;
      let seconds = 0;

      albumSongs.forEach((column, index) => {

          const length = albumSongs[index].song.length;
          const hoursMinutes = length && length.split(":")

          if(hoursMinutes && hoursMinutes.length == 2)
          {
              minutes = minutes + Number(hoursMinutes[0]);
              seconds = seconds + Number(hoursMinutes[1]);
          }            
      });

      const secondsToMinutes = Math.floor(seconds / 60);
      const leftOverSeconds = seconds % 60;

      minutes = minutes + secondsToMinutes;
      seconds = leftOverSeconds;
      sum = minutes + ":" + (seconds<10 ? "0" + seconds : seconds);
  }

  return sum;
}