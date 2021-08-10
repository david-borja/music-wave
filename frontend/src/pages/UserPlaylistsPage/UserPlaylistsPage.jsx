import { useContext } from "react";

import UserContext from "../../contexts/UserContext";
import { useCheckAuthentication } from "../../App";

// This CH is probably completely overkill. This encapsulation will make more sense when its logic starts to grow
const useUserContext = (UserContext) => {
  return useContext(UserContext);
};

const UserPlaylistsPage = () => {
  console.log("UserPlaylistPage");
  useCheckAuthentication();

  const { spotifyToken } = useUserContext(UserContext);
  return (
    <div>
      <h3>UserPlaylists Page</h3>

      {spotifyToken ? "User's access token ready to be used" : null}
    </div>
  );
};

export default UserPlaylistsPage;
