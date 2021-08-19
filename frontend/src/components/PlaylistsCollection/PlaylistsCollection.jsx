import React from "react";

// Some of this logic is similar to the useQuery hook in SearchForm component
const PlaylistsCollection = ({
  userPlaylists = [],
  editingNameOfPlaylistId,
  inputChangeName,
  onHandleChange,
  onHandleSubmit,
}) => {
  const renderedPlaylists = userPlaylists.map((item) =>
    editingNameOfPlaylistId === item.id ? (
      <form key={item.id} onSubmit={onHandleSubmit}>
        <input
          placeholder={item.name}
          value={inputChangeName}
          onChange={onHandleChange}
        ></input>
        <button type="submit">Submit Changes</button>
      </form>
    ) : (
      <div key={item.id} id={item.id} className="playlist">
        {item.name}
      </div>
    )
  );

  return <div className="playlistsCollection">{renderedPlaylists}</div>;
};

export default PlaylistsCollection;
