import "./App.css";

import Login from "./pages/LoginPage/LoginPage";
import UserPlaylistsPage from "./pages/UserPlaylistsPage/UserPlaylistsPage";

import { accessUrlSearchParam } from "./utils/urlParams";

const authCode = accessUrlSearchParam("code");

function App() {
  return (
    <div className="App">
      {authCode ? <UserPlaylistsPage authCode={authCode} /> : <Login />}
    </div>
  );
}

export default App;
