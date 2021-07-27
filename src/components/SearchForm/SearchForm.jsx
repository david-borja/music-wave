import { useState, useEffect } from "react";

import { requestAccessToken, search } from "../../services/api";

const SearchForm = ({ setCurrentSearch }) => {
  const [accessToken, setAccessToken] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const authenticate = async () => {
      const result = await requestAccessToken();
      setAccessToken(result);
    };
    authenticate();
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    const getSearchedItems = async () => {
      e.preventDefault();
      const results = await search({
        qry: query,
        accessToken,
      });

      setCurrentSearch(results);
    };
    getSearchedItems();
  };
  return (
    <div className="App">
      {/* reminder: onSubmit goes in the form, NOT in the submit button */}
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchForm;
