import { Song } from "@/types/song"; 

export default function getAlbumSongsTotalLength(tracks: Song[]) { 
    
  let sum = "";

  if(tracks.length > 0) {

      let minutes = 0;
      let seconds = 0;

      tracks.forEach((column, index: number) => {

          const length = tracks[index].song.length;
          const hoursMinutes = length.split(":")

          if(hoursMinutes.length == 2)
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