import React from "react";

import { useCheckAuthentication } from "../../hooks/useCheckAuthentication";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";

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

  return { loading, userPlaylists };
};

const UserPlaylistsPage = () => {
  const { loading, userPlaylists } = useUserPlaylists();

  return (
    <div>
      <h3>UserPlaylists Page</h3>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <PlaylistsCollection userPlaylists={userPlaylists} />
      )}
    </div>
  );
};

export default UserPlaylistsPage;
