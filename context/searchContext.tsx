import React, { createContext, useContext } from "react";

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValues] = React.useState({
    isSearching: false,
    searchLoading: false,
    searchResults: [],
    searchTerm: "",
  });

  const setBeginSearch = (searchTerm) => {
    setSearchValues({
      ...searchValue,
      searchTerm,
      isSearching: true,
      searchLoading: true,
    });
  }

  const setIsSearching = (isSearching) => {
    setSearchValues((prevState) => ({
      ...prevState,
      isSearching,
    }));
  };

  const setSearchResults = (searchResults) => {
    setSearchValues((prevState) => ({
      ...prevState,
      searchResults,
      searchLoading: false,
    }));
  };

  const resetSearch = () => {
    
    setSearchValues({ isSearching: false, searchResults: [], searchTerm: "", searchLoading: false });
  };
  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValues,
        setIsSearching,
        setSearchResults,
        setBeginSearch,
        resetSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === null) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export default {
  useSearch,
  SearchProvider,
};
