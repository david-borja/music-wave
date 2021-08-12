
// Al principio de cada pagina que requiera autenticacion
import React from "react";
import {useLocation} from "wouter"
import UserContext from '../contexts/UserContext'


export const useCheckAutentication = () => {
  const { accessToken, setNewCredentials } = React.useContext(UserContext);
  const [, setLocation] = useLocation();
  React.useEffect(() => {
    if (!accessToken) {
      const spotifyToken = localStorage.getItem("spotifyToken");
      const spotifyRefreshToken = localStorage.getItem("spotifyrefreshToken");
      if (spotifyToken) setNewCredentials({spotifyRefreshToken, spotifyToken});
      else setLocation("/login");
    }
  }, [accessToken, setLocation, setNewCredentials])

};
