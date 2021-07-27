const SearchResults = ({ currentSearch }) => {
  const { albums, artists, tracks } = currentSearch;

  return (
    <div>
      <h3>Top Results</h3>

      <h5>Albums</h5>
      <p>{albums && albums.items && albums.items[0].name}</p>

      <h5>Artists</h5>
      <p>{artists && artists.items && artists.items[0].name}</p>

      <h5>Tracks</h5>
      <p>{tracks && tracks.items && tracks.items[0].name}</p>
    </div>
  );
};

export default SearchResults;
