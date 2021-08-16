const PlaylistsCollection = ({ userPlaylists = [] }) => {
  const renderedPlaylists = userPlaylists.map((item, id) => (
    <div key={id} className="playlist">
      {item.name}
    </div>
  ));
  return <div className="playlistsCollection">{renderedPlaylists}</div>;
};

export default PlaylistsCollection;
