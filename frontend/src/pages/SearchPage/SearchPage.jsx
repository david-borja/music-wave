import { useState, useContext } from "react";

import UserContext from "../../contexts/UserContext";

import SearchForm from "../../components/SearchForm/SearchForm";
import SearchResults from "../../components/SearchResults/SearchResults";

import { search } from "../../services/api";

const useCurrentSearch = () => {
  const [currentSearch, setCurrentSearch] = useState({});
  const { accessToken } = useContext(UserContext);
  // AccessToken is undefined if I navigate to the SearchPage by manually changing the url. For now, accessToken is only accessible when I navigate to SearchPage by changing the location programatically from UserPlaylistPage with "setLocation()"
  console.log({ accessToken });

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
