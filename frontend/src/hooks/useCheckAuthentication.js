import { useEffect, useContext } from "react";
import { useLocation } from "wouter";

import UserContext from "../contexts/UserContext";

export const useCheckAuthentication = () => {
  const { accessToken, setNewCredentials } = useContext(UserContext);
  const [, setLocation] = useLocation();

  // Without wrapping this logic with useEffect, we get this Warning: Cannot update a component (`UserContextProvider`) while rendering a different component (`UserPlaylistsPage`).
  useEffect(() => {
    if (!accessToken) {
      const spotifyToken = localStorage.getItem("spotifyToken");
      if (spotifyToken) {
        // reminder: what we get from localStorage is in string format. If we want to use it as an object, we need to parse it.
        const userCredentials = JSON.parse(spotifyToken);
        setNewCredentials(userCredentials);
      } else setLocation("/login");
    }
  }, [accessToken, setLocation, setNewCredentials]);
};

export default useCheckAuthentication;
