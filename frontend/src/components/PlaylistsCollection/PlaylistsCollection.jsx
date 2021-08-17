import React from "react";

import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";

// Some of this logic is similar to the useQuery hook in SearchForm component
const useControlledInput = () => {
  const [input, setInput] = React.useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return { input, setInput, handleChange };
};

const PlaylistsCollection = ({
  userPlaylists = [],
  editingNameOfPlaylistId,
  setUserPlaylists,
  setEditingNameOfPlaylistId,
}) => {
  const { input, setInput, handleChange } = useControlledInput();
  const { fetchWithAuth } = useAuthenticatedFetch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      const [playlistToRename] = userPlaylists.filter(
        (pList) => pList.id === editingNameOfPlaylistId
      );
      const renamedPlaylist = { ...playlistToRename, name: input };
      const reassembledPlaylists = userPlaylists.map((pList) =>
        pList.id !== editingNameOfPlaylistId ? pList : renamedPlaylist
      );
      setUserPlaylists(reassembledPlaylists);

      const playlistId = editingNameOfPlaylistId;
      const UPDATE_PLAYLIST_URL = `playlists/${playlistId}`;
      const options = { method: "PUT", body: JSON.stringify({ name: input }) };

      // to do: check the response in useAuthenticatedFetch before parsing, because this particular response can't be parsed into an object.
      fetchWithAuth(UPDATE_PLAYLIST_URL, options);
    }
    setEditingNameOfPlaylistId(null);
    setInput("");
  };

  const renderedPlaylists = userPlaylists.map((item) =>
    editingNameOfPlaylistId === item.id ? (
      <form key={item.id} onSubmit={handleSubmit}>
        <input
          placeholder={item.name}
          value={input}
          onChange={handleChange}
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
