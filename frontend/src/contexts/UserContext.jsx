import React, { useState } from "react";

const Context = React.createContext({});

// The displayName property determines how the context object will be displayed on React DevTools
Context.displayName = "UserContext";

const useContextCredentials = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [profileInfo, setProfileInfo] = useState({});

  const setNewProfile = (userProfile) => {
    setProfileInfo(userProfile);
    localStorage.setItem("spotifyProfile", JSON.stringify(userProfile));
  };

  const setNewCredentials = (userCredentials) => {
    setAccessToken(userCredentials.accessToken);
    setRefreshToken(userCredentials.refreshToken);

    const { accessToken, refreshToken } = userCredentials;
    localStorage.setItem(
      "spotifyToken",
      JSON.stringify({
        accessToken,
        refreshToken,
      })
    );
  };

  return {
    accessToken,
    refreshToken,
    setNewCredentials,
    profileInfo,
    setNewProfile,
  };
};

export const UserContextProvider = ({ children }) => {
  return (
    <Context.Provider value={useContextCredentials()}>
      {children}
    </Context.Provider>
  );
};

export default Context;
