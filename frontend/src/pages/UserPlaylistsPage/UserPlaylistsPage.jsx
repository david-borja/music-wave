import {useCheckAutentication} from '../../hooks/useCheckAutentication';

const UserPlaylistsPage = () => {
  useCheckAutentication()
  return (
    <div>
      <h3>UserPlaylists Page</h3>
      "User's access token ready to be used"
    </div>
  );
};

export default UserPlaylistsPage;
