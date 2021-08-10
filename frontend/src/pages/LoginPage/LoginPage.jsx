import React, { useEffect, useContext } from "react";
import { useLocation } from "wouter";

import { accessUrlSearchParam } from "../../utils/urlParams";
import UserContext from "../../contexts/UserContext";

console.log("LoginPage");

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

// It seems we have to call this function here outside the component. Otherwise it returns null
console.log("LoginComponent");
const authCode = accessUrlSearchParam("code");

const useLogin = (authCode) => {
  const [_, setLocation] = useLocation();
  const { accessToken, setAccessToken, setRefreshToken, setExpiresIn } =
    useContext(UserContext);

  console.log({ accessToken });

  useEffect(() => {
    if (authCode && !accessToken) {
      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: authCode }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          // console.log("updating context values");
          // This updates the context values
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          setExpiresIn(data.expiresIn);

          // console.log("saving spotifyToken in localStorage");
          // Remember: this isn't the securest way to save the token. Look for better options
          localStorage.setItem(
            "spotifyToken",
            JSON.stringify({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );
          setLocation("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [
    accessToken,
    authCode,
    setAccessToken,
    setRefreshToken,
    setExpiresIn,
    setLocation,
  ]);
};

const LoginPage = () => {
  // Calling accessUrlSearchParam here inside the component returns null
  // const authCodeInside = accessUrlSearchParam("code");

  useLogin(authCode);

  return (
    <div>
      <a href={AUTH_URL}>Login With Spotify</a>
    </div>
  );
};
export default LoginPage;
