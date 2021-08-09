import React, { useState } from "react";

const Context = React.createContext({});

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState("");
  return { accessToken, setAccessToken };
};

export const UserContextProvider = ({ children, spotifyToken}) => {
  const { accessToken, setAccessToken } = useAccessToken(spotifyToken);

  return (
    <Context.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
