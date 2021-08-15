import React, { useState } from "react";

const Context = React.createContext({});

// The displayName property determines how the context object will be displayed on React DevTools
Context.displayName = "UserContext";

const useContextCredentials = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const setNewCredentials = (userCredentials) => {
    setAccessToken(userCredentials.accessToken);
    setRefreshToken(userCredentials.refreshToken);
  };

  return {
    accessToken,
    refreshToken,
    setNewCredentials,
  };
};

export const UserContextProvider = ({ children }) => {
  console.log("UserContext", useContextCredentials());

  return (
    <Context.Provider value={useContextCredentials()}>
      {children}
    </Context.Provider>
  );
};

export default Context;
