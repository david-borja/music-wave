import React, { useState } from "react";

const Context = React.createContext({});
Context.displayName = "UserContext";

const useContextCredentials = () => {
  const [ accessToken, setAccessToken ] = useState(null);
  const [ refreshToken, seRefreshToken ] = useState(null);

  const setNewCredentials = (userCredentials) => {
    setAccessToken(userCredentials.spotifyToken);
    seRefreshToken(userCredentials.spotifyRefreshToken);
  }

  return { accessToken, refreshToken, setNewCredentials }
}

export const UserContextProvider = ({ children }) => (
  <Context.Provider value={useContextCredentials()}>
    {children}
  </Context.Provider>
);

export default Context;
