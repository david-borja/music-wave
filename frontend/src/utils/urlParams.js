export const accessUrlSearchParam = (searchParamStr) => {
  let searchParamValue = null;
  const queryString = window.location.search; // accesses the search property in the location object and returns the query (or search) string containing a '?' followed by the parameters of the URL (?code=14fagvw...)

  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString); // creates a new instance of this interface that defines utility methods to work with the query string of a URL. Returns an object with utilities
    searchParamValue = urlParams.get(searchParamStr);
  }
  // console.log({ searchParamValue });
  return searchParamValue;
};
