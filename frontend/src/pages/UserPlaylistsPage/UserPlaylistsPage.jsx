import useAuth from "./useAuth";

const UserPlaylistsPage = ({ authCode }) => {
  const accessToken = useAuth(authCode);
  return (
    <div>
      <h3>UserPlaylists Page</h3>

      {accessToken ? "User's access token ready to be used" : null}
    </div>
  );
};

export default UserPlaylistsPage;
