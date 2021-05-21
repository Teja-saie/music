import React,{useState,useRef} from 'react';
import Player from "./components/Player";
import Song from "./components/song";
import "./styles/app.scss";
import data from "./utit";
import Lib from "./components/Lib";
import Nav from "./components/Nav";





function App() {
   const audioref = useRef(null);
  const [songs, setsongs] = useState(data());
  const [currentsong, setcurrentsong] = useState(songs[1]);
  const [isplaying, setisplaying] = useState(false);
  const [songinfo, setsonginfo] = useState({
        currenttime: 0,
        duration: 0,
  });
  const [librarystatus, setlibrarystatus] = useState(false);
   const timeupdatehandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setsonginfo({...songinfo,currenttime:current,duration})
        
   };
  const songendhandler = async () => {
    let currentindex = songs.findIndex((song) => song.id === currentsong.id);
    await setcurrentsong(songs[(currentindex + 1) % songs.length]);
    if (isplaying) audioref.current.play();

  };
  return (
    <div className={`App ${librarystatus ?"library-active":""}`}>
      <Nav librarystatus={librarystatus} setlibrarystatus={setlibrarystatus}/>

      <Song currentsong={currentsong} />
       <Lib librarystatus={librarystatus} setsongs={setsongs} isplaying={isplaying} audioref={audioref} songs={songs} setcurrentsong={setcurrentsong} />
      <Player setcurrentsong={setcurrentsong} songs={songs} setsonginfo={ setsonginfo} songinfo={songinfo} audioref={audioref} isplaying={isplaying} setisplaying={setisplaying} currentsong={currentsong} setsongs={setsongs} />
     
     
      <audio onEnded={ songendhandler} onTimeUpdate={timeupdatehandler} onLoadedMetadata={timeupdatehandler} ref={audioref} src={currentsong.audio}></audio>
    </div>
  );
};

export default App;
