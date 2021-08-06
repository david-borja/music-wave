import React, { useState } from "react";

const Context = React.createContext({});

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState("");
  return { accessToken, setAccessToken };
};

export const UserContextProvider = ({ children }) => {
  const { accessToken, setAccessToken } = useAccessToken();

  return (
    <Context.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
