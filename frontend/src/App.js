import React from "react";
import { Route } from "wouter";

import LoginPage from "./pages/LoginPage/LoginPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import UserPlaylistsPage from "./pages/UserPlaylistsPage/UserPlaylistsPage";

import { UserContextProvider } from "./contexts/UserContext";
import { accessUrlSearchParam } from "./utils/urlParams";

import "./App.css";

const authCode = accessUrlSearchParam("code");

function App() {
  return (
    <UserContextProvider>
      {/* For lack of a better solution, here I'm conditionally running useAuth hook inside of the UserPlaylistsPage. useAuth should probably always be running because is in charge of refreshing the accessToken when expiresIn is due. However, I didn't find a way of triggering useAuth in the top level of the App component, because initially there isn't a valid authCode in the URL until the user clicks on Login With Spotify. useAuth shouldn't run when being passed an invalid authCode */}
      <div className="App">
        {authCode ? <UserPlaylistsPage authCode={authCode} /> : <LoginPage />}
        <Route path="/search" component={SearchPage} />
      </div>
    </UserContextProvider>
  );
}

export default App;
