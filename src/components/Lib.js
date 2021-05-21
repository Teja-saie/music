import React, { Component } from 'react';
import Librarysong from "./librarySongs";
import "../styles/_lib.scss";


const Lib = ({librarystatus,setsongs,isplaying, audioref,songs,setcurrentsong}) => {
    return (
        <div className={`library ${librarystatus?'active-library':''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => <Librarysong setcurrentsong={setcurrentsong} song={song} songs={songs} id={song.id} key={song.id} audioref={audioref} setsongs={setsongs} isplaying={isplaying}/>)}
            </div>
        </div>
    );
};

export default Lib;