import React from "react";

import { useControlledInput } from "../../hooks/useControlledInput";

const useQuery = (handleSearch, initialState) => {
  const { input, handleChange } = useControlledInput(initialState);
  // It seems we can get away without using React.useMemo(()=>{},[]).
  // If we just use a plain object, everything seems to work fine
  const handlers = {
    handleChange,
    handleSubmit: (e) => {
      e.preventDefault();
      handleSearch(input);
    },
  };

  // React.useMemo returns a memoized value that will only be recumputed when some dependendy has changed
  // const handlers = React.useMemo(
  //   () => ({
  //     handleChange: (e) => {
  //       setState(e.target.value);
  //       console.log(state);
  //     },
  //     handleSubmit: (e) => {
  //       e.preventDefault();
  //       handleSearch(state);
  //     },
  //   }),
  //   [state, handleSearch]
  // );

  return [input, handlers];
};

const SearchForm = ({ handleSearch }) => {
  const [query, { handleChange, handleSubmit }] = useQuery(handleSearch);

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
