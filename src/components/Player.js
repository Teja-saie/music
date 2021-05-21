import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPause,faPlay,faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


const Player = ({songs,setsonginfo,songinfo, currentsong,isplaying,setisplaying,audioref,setcurrentsong,setsongs }) => {
    const activelibraryhandler = (nextprev) => {
         const newSongs = songs.map((song) => {
      if (song.id === nextprev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
        setsongs(newSongs);
       
        
    }
    const playsongshandler = () => {
        if (isplaying) {

            audioref.current.pause();
            setisplaying(!isplaying);
        } else {
            audioref.current.play();
            setisplaying(!isplaying);
        }
    }
    
   
    const gettime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };
    const draghandler = (e) => {
        audioref.current.currentTime = e.target.value;
        setsonginfo({ ...songinfo, currenttime: e.target.value });
      
        
    };
    
    const skiptrackhandler = async(direction) => {
        let currentindex = songs.findIndex((song) => song.id === currentsong.id);

          if(direction === "skip-forward"){
           await setcurrentsong(songs[(currentindex + 1)% songs.length]);
              activelibraryhandler(songs[(currentindex + 1) % songs.length]);
        }
        if (direction === "skip-back") {
            if ((currentindex - 1) % songs.length === -1) {
                await setcurrentsong(songs[songs.length - 1]);
                 activelibraryhandler(songs[songs.length - 1]);
                  if (isplaying) audioref.current.play();
                return;
            }
            await setcurrentsong(songs[(currentindex - 1)% songs.length]);
                   activelibraryhandler(songs[(currentindex - 1)% songs.length]);
        }
        
        if (isplaying) audioref.current.play();
    };
  
    





    return (
        <div className="player">
            <div className="time-control">
                <p>{gettime(songinfo.currenttime)}</p>
                <input min={0} max={ songinfo.duration||0} value={songinfo.currenttime} onChange={draghandler} type="range"></input>
                <p>{songinfo.duration ? gettime(songinfo.duration):'0:00'}</p>


            </div>
            <div className="play-control">
                <FontAwesomeIcon  onClick={()=>skiptrackhandler("skip-back")}  className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon  onClick={playsongshandler }  className="play" icon={isplaying? faPause:faPlay} />
                <FontAwesomeIcon  onClick={()=>skiptrackhandler("skip-forward")}  className="skip-forward"  size="2x" icon={faAngleRight}/>
            </div>
           
        </div>
    );
};

export default Player;