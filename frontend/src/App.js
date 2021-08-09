import React from "react";
import { Route } from "wouter";

import LoginPage from "./pages/LoginPage/LoginPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import UserPlaylistsPage from "./pages/UserPlaylistsPage/UserPlaylistsPage";

import { UserContextProvider } from "./contexts/UserContext";


import {useLocation} from "wouter"

import "./App.css";



const useInitialAutorization = () => {
  const [_, setLocation] = useLocation();
  const spotifyToken = localStorage.getItem("spotifyToken");
  if (!spotifyToken) {
    setLocation("/login");
  }

  return spotifyToken;
}

const useAutenticationFetch = (url, options = {}) => {
  const [loading, setLoading] = React.useState(false);
  const [_, setLocation] = useLocation();
  const { accessToken, refreshToken, setAccessToken } = React.useContext(UserContext);
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
      })
  }
  const fetchWithAuth = async (url, options) => {

    const headers = new Headers({ ...options.headers, "Authorization": `Bearer ${accessToken}` });
    const fetchOptions = {...options, headers}

    setLoading(true);
    const response = await fetch(url, fetchOptions);
    if (response.status === 401) {
      if (tries === 0) {
        const refreshToken = await fetchRefreshToken()
        setAccessToken(refreshToken);
        setTries(1);
        fetchWithAuth(url, options)
      }
      setLoading(false);
      setLocation("/login");
    }

    setTries(0);
    const data = await response.json();
    setLoading(false);
    return data;
  }


  return {loading, fetchWithAuth,}
}

// Al principio de cada pagina que requiera autenticacion
const useCheckAutentication = () => {
  const { accessToken } = React.useContext(UserContext);
  const [_, setLocation] = useLocation();
  React.useEffect(() => {
    if (!accessToken) {
      setLocation("/login");
    }
  }, [accessToken, setLocation])
}; 





function App() {
  const spotifyToken = useInitialAutorization();

  return (
    <UserContextProvider spotifyToken={spotifyToken}>
      {/* For lack of a better solution, here I'm conditionally running useAuth hook inside of the UserPlaylistsPage. useAuth should probably always be running because is in charge of refreshing the accessToken when expiresIn is due. However, I didn't find a way of triggering useAuth in the top level of the App component, because initially there isn't a valid authCode in the URL until the user clicks on Login With Spotify. useAuth shouldn't run when being passed an invalid authCode */}
      <div className="App">
        <Route path="/login" component={LoginPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/" component={UserPlaylistsPage} />
      </div>
    </UserContextProvider>
  );
}

export default App;
