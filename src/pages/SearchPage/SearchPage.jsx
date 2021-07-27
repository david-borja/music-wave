import { useState } from "react";

import SearchForm from "../../components/SearchForm/SearchForm";
import SearchResults from "../../components/SearchResults/SearchResults";

const SearchPage = () => {
  const [currentSearch, setCurrentSearch] = useState({});

  return (
    <div>
      <SearchForm setCurrentSearch={setCurrentSearch} />
      <SearchResults currentSearch={currentSearch} />
    </div>
  );
};

export default SearchPage;
