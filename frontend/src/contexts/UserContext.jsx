import React, { useState } from "react";

const Context = React.createContext({});

export const UserContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  return (
    <Context.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
