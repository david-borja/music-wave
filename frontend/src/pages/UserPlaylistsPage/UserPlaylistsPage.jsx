import React from "react";

import { useCheckAuthentication } from "../../hooks/useCheckAuthentication";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useControlledInput } from "../../hooks/useControlledInput";

import UserContext from "../../contexts/UserContext";

import PlaylistsCollection from "../../components/PlaylistsCollection/PlaylistsCollection";

const USER_PLAYLISTS_URL = "me/playlists?limit=50";

const useUserPlaylists = () => {
  useCheckAuthentication();
  const { accessToken } = React.useContext(UserContext);
  const { loading, fetchWithAuth } = useAuthenticatedFetch();
  const [userPlaylists, setUserPlaylists] = React.useState([]);
  React.useEffect(() => {
    if (accessToken) {
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

  const newPlaylistHandlers = {
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
      const createPlaylistUrl = `users/${userId}/playlists`;
      const options = {
        method: "POST",
        body: JSON.stringify({ name: newPlaylist }),
      };
      fetchWithAuth(createPlaylistUrl, options);
    },
  };

  return [newPlaylist, newPlaylistHandlers];
};

const useChangePlaylistName = () => {
  const { fetchWithAuth } = useAuthenticatedFetch();
  const [editingNameOfPlaylistId, setEditingNameOfPlaylistId] =
    React.useState(null);
  const { userPlaylists, setUserPlaylists } = useUserPlaylists();
  const {
    input: inputChangeName,
    setInput: setInputChangeName,
    handleChange: onHandleChange,
  } = useControlledInput();

  const changeNameHandlers = {
    handleClick: (e) => {
      // to do: unselect playlist when user does on blur AND doesn't select another playlist
      const clickedEl = e.target;
      if (clickedEl.nodeName === "DIV" && clickedEl.className === "playlist") {
        setEditingNameOfPlaylistId(clickedEl.id);
      }
    },
    onHandleChange,
    onHandleSubmit: (e) => {
      e.preventDefault();
      if (inputChangeName) {
        const [playlistToRename] = userPlaylists.filter(
          (pList) => pList.id === editingNameOfPlaylistId
        );
        const renamedPlaylist = { ...playlistToRename, name: inputChangeName };
        const reassembledPlaylists = userPlaylists.map((pList) =>
          pList.id !== editingNameOfPlaylistId ? pList : renamedPlaylist
        );
        setUserPlaylists(reassembledPlaylists);

        const playlistId = editingNameOfPlaylistId;
        const updatePlaylistUrl = `playlists/${playlistId}`;
        const options = {
          method: "PUT",
          body: JSON.stringify({ name: inputChangeName }),
        };

        // to do: check the response in useAuthenticatedFetch before parsing, because this particular response can't be parsed into an object.
        fetchWithAuth(updatePlaylistUrl, options);
      }
      setEditingNameOfPlaylistId(null);
      setInputChangeName("");
    },
  };
  return {
    inputChangeName,
    changeNameHandlers,
    editingNameOfPlaylistId,
  };
};

const UserPlaylistsPage = () => {
  const { loading, userPlaylists, setUserPlaylists } = useUserPlaylists();
  useUserProfile();
  const [newPlaylist, { handleChange, handleSubmit }] = useNewPlaylist(
    setUserPlaylists,
    userPlaylists
  );
  const {
    inputChangeName,
    editingNameOfPlaylistId,
    changeNameHandlers: { handleClick, onHandleChange, onHandleSubmit },
  } = useChangePlaylistName();

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
            inputChangeName={inputChangeName}
            onHandleChange={onHandleChange}
            onHandleSubmit={onHandleSubmit}
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
