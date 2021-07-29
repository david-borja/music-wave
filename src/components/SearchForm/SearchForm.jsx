import { useState } from "react";

const SearchForm = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
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
