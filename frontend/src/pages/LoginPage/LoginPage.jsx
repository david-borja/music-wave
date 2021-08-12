
import React from 'react';

import { accessUrlSearchParam } from "../../utils/urlParams";
import useLogin, {AUTH_URL} from '../../hooks/useLogin'



const LoginPage = () => {
  const spotifyToken = accessUrlSearchParam("code");
  useLogin(spotifyToken);
  return (
    <div>
      <a href={AUTH_URL}>Login With Spotify</a>
    </div>
  );
};
export default LoginPage;
