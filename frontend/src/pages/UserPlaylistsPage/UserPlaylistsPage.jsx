import useCheckAuthentication from "../../hooks/useCheckAuthentication";

const UserPlaylistsPage = () => {
  useCheckAuthentication();

  return (
    <div>
      <h3>UserPlaylists Page</h3>
    </div>
  );
};

export default UserPlaylistsPage;
