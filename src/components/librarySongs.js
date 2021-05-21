import React from "react";


const Librarysong = ({
  isplaying,
  audioref,
  song,
  songs,
  setcurrentsong,
  id,
  setsongs,
}) => {
  const songselecthandler =async () => {
    await setcurrentsong(song);

    const newSongs = songs.map((song) => {
      if (song.id === id) {
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
    if (isplaying) audioref.current.play();


  };
  return (
    <div
      onClick={songselecthandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt="song-cover"></img>
      <div className="song-description">
        <h3> {song.name}</h3>
        <h2>{song.artist}</h2>
      </div>
    </div>
  );
};

export default Librarysong;
