import { useEffect, useContext } from "react";
import { useLocation } from "wouter";

import UserContext from "../contexts/UserContext";

import { accessUrlSearchParam } from "../utils/urlParams";
import auth from "../utils/spotifyAuth";

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}/login&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

// to do: Would it make sense to prevent getCredentials to run if there is an accessToken in localStorage already?
const getCredentials = async (authCode, setLocation, setNewCredentials) => {
  try {
    const data = await auth(authCode);

    if (data.accessToken) {
      const { accessToken, refreshToken } = data;

      setNewCredentials({ accessToken, refreshToken });
      localStorage.setItem(
        "spotifyToken",
        JSON.stringify({
          accessToken,
          refreshToken,
        })
      );
      setLocation("/");
    }
  } catch (err) {
    // console.log(err)
    setLocation("/login");
  }
};

const useLogin = async () => {
  const { accessToken, setNewCredentials } = useContext(UserContext);
  const [, setLocation] = useLocation();
  const authCode = accessUrlSearchParam("code");

  useEffect(() => {
    if (!accessToken && authCode) {
      getCredentials(authCode, setLocation, setNewCredentials);
    }
  }, [authCode, accessToken, setLocation, setNewCredentials]);
};

export default useLogin;
