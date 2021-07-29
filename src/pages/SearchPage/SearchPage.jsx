import { useState, useEffect } from "react";

import SearchForm from "../../components/SearchForm/SearchForm";
import SearchResults from "../../components/SearchResults/SearchResults";

import { requestAccessToken, search } from "../../services/api";

const useCurrentSearch = () => {
  const [accessToken, setAccessToken] = useState("");
  const [currentSearch, setCurrentSearch] = useState({});

  useEffect(() => {
    const authenticate = async () => {
      const result = await requestAccessToken();
      setAccessToken(result);
    };
    authenticate();
  }, []);

  const handleSearch = async (query) => {
    const results = await search({
      qry: query,
      accessToken,
    });
    setCurrentSearch(results);
  };

  return { currentSearch, handleSearch };
};

const SearchPage = () => {
  const { currentSearch, handleSearch } = useCurrentSearch();

  return (
    <div>
      <SearchForm handleSearch={handleSearch} />
      <SearchResults currentSearch={currentSearch} />
    </div>
  );
};

export default SearchPage;
