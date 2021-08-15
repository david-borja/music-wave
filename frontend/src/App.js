import { Route } from "wouter";

import LoginPage from "./pages/LoginPage/LoginPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import UserPlaylistsPage from "./pages/UserPlaylistsPage/UserPlaylistsPage";

import { UserContextProvider } from "./contexts/UserContext";

import "./App.css";

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Route path="/search" component={SearchPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={UserPlaylistsPage} />
      </div>
    </UserContextProvider>
  );
}

export default App;
