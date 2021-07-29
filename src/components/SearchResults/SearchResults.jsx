const SearchResults = ({ currentSearch }) => {
  const { albums, artists, tracks } = currentSearch;

  return (
    <div>
      <h3>Top Results</h3>

      <h5>Albums</h5>
      {albums?.items?.[0]?.name}

      <h5>Artists</h5>
      {artists?.items?.[0]?.name}

      <h5>Tracks</h5>
      {tracks?.items?.[0]?.name}
    </div>
  );
};

export default SearchResults;
