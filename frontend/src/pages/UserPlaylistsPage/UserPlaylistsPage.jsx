import { useContext } from "react";
import { useLocation } from "wouter";

import UserContext from "../../contexts/UserContext";
import useAuth from "../../useAuth";

const UserPlaylistsPage = (authCode) => {
  useAuth(authCode);
  const { accessToken } = useContext(UserContext);
  console.log({ accessToken });

  // This is a hook from wouter that imitates history.push("/someroute")
  const [location, setLocation] = useLocation();
  setLocation("/search");

  return (
    <div>
      <h3>UserPlaylists Page</h3>

      {accessToken ? "User's access token ready to be used" : null}
    </div>
  );
};

export default UserPlaylistsPage;
