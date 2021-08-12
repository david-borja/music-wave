import React, { useState } from "react";

const Context = React.createContext({});

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(0);

  return {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    expiresIn,
    setExpiresIn,
  };
};

export const UserContextProvider = ({ children, spotifyToken }) => {
  const {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    expiresIn,
    setExpiresIn,
  } = useAccessToken();

  return (
    <Context.Provider
      value={{
        spotifyToken,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        expiresIn,
        setExpiresIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
