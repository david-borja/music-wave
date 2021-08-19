import React from "react";

import { useCheckAuthentication } from "../../hooks/useCheckAuthentication";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { useUserProfile } from "../../hooks/useUserProfile";

import UserContext from "../../contexts/UserContext";

import PlaylistsCollection from "../../components/PlaylistsCollection/PlaylistsCollection";

const USER_PLAYLISTS_URL = "me/playlists?limit=50";

const useUserPlaylists = () => {
  useCheckAuthentication();
  const { accessToken } = React.useContext(UserContext);
  const { loading, fetchWithAuth } = useAuthenticatedFetch();
  const [userPlaylists, setUserPlaylists] = React.useState([]);
  React.useEffect(() => {
    console.log("outside if");
    if (accessToken) {
      console.log("inside if");
      fetchWithAuth(USER_PLAYLISTS_URL)
        .then((data) => {
          console.log(data);
          setUserPlaylists(data.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [accessToken]);

  return { loading, userPlaylists, setUserPlaylists };
};

const useNewPlaylist = (setUserPlaylists, userPlaylists) => {
  const { fetchWithAuth } = useAuthenticatedFetch();
  const [newPlaylist, setNewPlaylist] = React.useState("");
  const { profileInfo } = React.useContext(UserContext);
  const [temporaryId, setTemporaryId] = React.useState(0);

  const handlers = {
    handleChange: (e) => {
      setNewPlaylist(e.target.value);
    },
    handleSubmit: (e) => {
      e.preventDefault();
      setUserPlaylists([
        ...userPlaylists,
        { name: newPlaylist, id: temporaryId.toString() },
      ]);
      setNewPlaylist("");
      setTemporaryId(temporaryId + 1);
      const { id: userId } = profileInfo;
      const CREATE_PLAYLIST_URL = `users/${userId}/playlists`;
      const options = {
        method: "POST",
        body: JSON.stringify({ name: newPlaylist }),
      };
      fetchWithAuth(CREATE_PLAYLIST_URL, options);
    },
  };

  return [newPlaylist, handlers];
};

const useChangePlaylistName = () => {
  const [editingNameOfPlaylistId, setEditingNameOfPlaylistId] =
    React.useState(null);

  const handleClick = (e) => {
    // to do: unselect playlist when user does on blur AND doesn't select another playlist
    const clickedEl = e.target;
    if (clickedEl.nodeName === "DIV" && clickedEl.className === "playlist") {
      setEditingNameOfPlaylistId(clickedEl.id);
    }
  };

  return { handleClick, editingNameOfPlaylistId, setEditingNameOfPlaylistId };
};

const UserPlaylistsPage = () => {
  const { loading, userPlaylists, setUserPlaylists } = useUserPlaylists();
  useUserProfile();
  const [newPlaylist, { handleChange, handleSubmit }] = useNewPlaylist(
    setUserPlaylists,
    userPlaylists
  );
  const { handleClick, editingNameOfPlaylistId, setEditingNameOfPlaylistId } =
    useChangePlaylistName();

  return (
    <div>
      <h3>UserPlaylists Page</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        // to do: would it be better if the onClick were NOT listening to the form?
        <div onClick={handleClick}>
          <PlaylistsCollection
            userPlaylists={userPlaylists}
            editingNameOfPlaylistId={editingNameOfPlaylistId}
            setUserPlaylists={setUserPlaylists}
            setEditingNameOfPlaylistId={setEditingNameOfPlaylistId}
          />
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Create a new Playlist"
              value={newPlaylist}
              onChange={handleChange}
            />
            <button>Create</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserPlaylistsPage;
