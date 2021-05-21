import React from 'react';



const Song = ({ currentsong }) => {

    return (
        <div className="Song-container">
            <img src={currentsong.cover} alt="song-cover"></img>
            <h2> { currentsong.name}</h2>
            <h1>{currentsong.artist}</h1>
        </div>
    );
};

export default Song;