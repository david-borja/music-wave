
import React, { useState } from 'react'
import {useLocation} from "wouter"

import  UserContext from '../contexts/UserContext';


const BASE_API_URL = 'https://api.spotify.com/v1/'

const fetchRefreshToken = (refreshToken) => {
  fetch("http://localhost:5000/refresh", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    })
}


export const useAutenticationFetch = () => {
  const [loading, setLoading] = React.useState(false);
  const [, setLocation] = useLocation();
  const { accessToken, refreshToken, setNewCredentials } = React.useContext(UserContext);
  const [tries, setTries] = useState(0)


  const fetchWithAuth = async (url, options = {}) => {
    const defaultheaders = {
      "Authorization": `Bearer ${accessToken}`
    }
    const fetchOptions = {method: 'GET', ...options, ...{headers: defaultheaders}}

    setLoading(true);
   try {
    const response = await fetch(`${BASE_API_URL}${url}`, fetchOptions);
    if (response.status === 401) {
      if (tries === 0) {
        setTries(1)
        const data = await fetchRefreshToken(refreshToken)
        if (data.accessToken) {
          setNewCredentials({
            spotifyToken: data.accessToken,
            spotifyRefreshToken: data.refreshToken,
          });
          localStorage.setItem("spotifyToken", data.accessToken);
          localStorage.setItem("spotifyrefreshToken", data.refreshToken);
          fetchWithAuth(url, options)
        } else {
          setLocation(`/login`);
        }
      }
      setLocation(`/login`);
      throw new Error("Autentication error");
    }

    const data = await response.json();
    return data;
   } catch (err) {
     console.error(err);
   } finally {
    setLoading(false);
   }
}


  return {loading, fetchWithAuth,}
}
