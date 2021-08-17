import React, { useState } from "react";
import { useLocation } from "wouter";

import UserContext from "../contexts/UserContext";

const BASE_API_URL = "https://api.spotify.com/v1/";
const REFRESH_URL = "http://localhost:5000/refresh";

// to do: I think this could be extracted from the hook as we did with the auth function in spotifyAuth.js
const fetchRefreshToken = (refreshToken) => {
  return (
    fetch(REFRESH_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    })
      // to do: check if we need .then() here and the return(s), or if it is enough with the try catch block in the hook
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err))
  );
};

export const useAuthenticatedFetch = () => {
  const { accessToken, refreshToken, setNewCredentials } =
    React.useContext(UserContext);
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const fetchWithAuth = async (url, options = {}) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
    const fetchOptions = { method: "GET", ...options, headers };
    setLoading(true);
    try {
      const response = await fetch(`${BASE_API_URL}${url}`, fetchOptions);
      if (response.status === 401) {
        const data = await fetchRefreshToken(refreshToken);
        if (data.accessToken) {
          console.log(
            `updating old token ${accessToken} for ${data.accessToken} in Context`
          );
          setNewCredentials({
            accessToken: data.accessToken,
            refreshToken,
          });
        } else {
          setLocation(`/login`);
          throw new Error("Autentication error");
        }
      }
      console.log({ response });
      // to do: how to check if the response can be parsed into an object?
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      // reminder: "finally" provides a way for code to be run whether the promise was fulfilled successfully or rejected once the Promise has been dealt with.
      setLoading(false);
    }
  };

  return { loading, fetchWithAuth };
};
