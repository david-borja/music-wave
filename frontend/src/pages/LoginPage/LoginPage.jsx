
import React from 'react';
import {useLocation} from "wouter"

import { accessUrlSearchParam } from "../../utils/urlParams";
import UserContext from '../../contexts/UserContext'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}/login&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;


const useLogin = (authCode) => {
  const [_, setLocation] = useLocation();
  const { accessToken, setAccessToken } = React.useContext(UserContext);
  React.useEffect(() => {
    if (authCode) {
      localStorage.setItem("spotifyToken", authCode);
      setAccessToken(accessToken)
      setLocation("/");
    }
  }, [accessToken, authCode, setAccessToken, setLocation]);
}
const LoginPage = () => {
  const authCode = accessUrlSearchParam("code");
  useLogin(authCode);
  return (
    <div>
      <a href={AUTH_URL}>Login With Spotify</a>
    </div>
  );
};
export default LoginPage;
