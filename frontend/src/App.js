import React, { useEffect, useContext } from "react";
import { Route } from "wouter";

import LoginPage from "./pages/LoginPage/LoginPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import UserPlaylistsPage from "./pages/UserPlaylistsPage/UserPlaylistsPage";

import { UserContextProvider } from "./contexts/UserContext";
import UserContext from "./contexts/UserContext";

import { useLocation } from "wouter";

import "./App.css";

const useInitialAuthorization = () => {
  const [_, setLocation] = useLocation();
  const spotifyToken = localStorage.getItem("spotifyToken");

  if (!spotifyToken) {
    // console.log("no valid spotifyToken in localStorage. Redirecting to /login");
    setLocation("/login");
  }
  return spotifyToken;
};

// This hook shoud be extracted from this file
const useAutenticationFetch = (url, options = {}) => {
  const [loading, setLoading] = React.useState(false);
  const [_, setLocation] = useLocation();
  const { accessToken, refreshToken, setAccessToken } = useContext(UserContext);
  const [tries, setTries] = React.useState(0);

  // Fetch en todos los componentes
  const fetchRefreshToken = () => {
    fetch("http://localhost:5000/refresh", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
  };
  const fetchWithAuth = async (url, options) => {
    // Why do we need to use the Headers constructor? Can't we do it without?
    const headers = new Headers({
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    });
    const fetchOptions = { ...options, headers };

    setLoading(true);
    const response = await fetch(url, fetchOptions);
    if (response.status === 401) {
      if (tries === 0) {
        const refreshedAccessToken = await fetchRefreshToken();
        setAccessToken(refreshedAccessToken);
        setTries(1);
        fetchWithAuth(url, options);
      }
      setLoading(false);
      setLocation("/login");
    }

    setTries(0);
    const data = await response.json();
    setLoading(false);
    return data;
  };

  return { loading, fetchWithAuth };
};

// This hook should also be extracted
// Al principio de cada pagina que requiera autenticacion
export const useCheckAuthentication = () => {
  const { setAccessToken, setRefreshToken } = useContext(UserContext);
  const spotifyToken = useInitialAuthorization();
  console.log({ spotifyToken });
  useEffect(() => {
    if (spotifyToken) {
      // console.log(
      //   "saving spotifyToken in context as accessToken and refreshToken"
      // );
      setAccessToken(spotifyToken.accessToken);
      setRefreshToken(spotifyToken.refreshToken);
    }
  }, [spotifyToken, setAccessToken, setRefreshToken]);
};

function App() {
  const spotifyToken = useInitialAuthorization();

  return (
    <UserContextProvider spotifyToken={spotifyToken}>
      <div className="App">
        <Route path="/search" component={SearchPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={UserPlaylistsPage} />
      </div>
    </UserContextProvider>
  );
}

export default App;
