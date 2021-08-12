import { useState } from "react";

import {useCheckAutentication} from '../../hooks/useCheckAutentication';
import {useAutenticationFetch} from '../../hooks/useAutenticatedFetch';

import SearchForm from "../../components/SearchForm/SearchForm";
import SearchResults from "../../components/SearchResults/SearchResults";


const useCurrentSearch = () => {
  useCheckAutentication()
  const {loading, fetchWithAuth} = useAutenticationFetch();
  const [currentSearch, setCurrentSearch] = useState({});

  const handleSearch = async (query) => {
    const searchUrl = `search?q=${query}&type=album,artist,track`
    const results = await fetchWithAuth(searchUrl);
    setCurrentSearch(results);
  };

  return { currentSearch, handleSearch, loading };
};

const SearchPage = () => {
  const { currentSearch, handleSearch, loading } = useCurrentSearch();

  return (
    <div>
      <SearchForm handleSearch={handleSearch} />
      { loading ? (<div>Loading...</div>) : <SearchResults currentSearch={currentSearch} />}
    </div>
  );
};

export default SearchPage;
