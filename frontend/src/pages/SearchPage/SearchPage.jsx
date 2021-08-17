import { useState } from "react";

// When importing a hook from a file with more stuff, better to do a named import
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { useCheckAuthentication } from "../../hooks/useCheckAuthentication";

import SearchForm from "../../components/SearchForm/SearchForm";
import SearchResults from "../../components/SearchResults/SearchResults";

const useCurrentSearch = () => {
  useCheckAuthentication();
  const { loading, fetchWithAuth } = useAuthenticatedFetch();
  const [currentSearch, setCurrentSearch] = useState({});

  const handleSearch = async (query) => {
    const SEARCH_URL = `search?q=${query}&type=album,artist,track`;
    const results = await fetchWithAuth(SEARCH_URL);
    setCurrentSearch(results);
  };

  return { currentSearch, handleSearch, loading };
};

const SearchPage = () => {
  const { currentSearch, handleSearch, loading } = useCurrentSearch();

  return (
    <div>
      <SearchForm handleSearch={handleSearch} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <SearchResults currentSearch={currentSearch} />
      )}
    </div>
  );
};

export default SearchPage;
