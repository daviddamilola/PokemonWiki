import React, {
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useDebounce } from "../services/hooks";
import { useSearch } from "../context/searchContext";
import api from "../services/initApi";

export default function SearchBar() {
  const [value, setValue] = useState("");

  const { setSearchResults ,resetSearch, setBeginSearch, searchValue: {isSearching} } = useSearch();

  const handleSearch = async (term) => {
    if (!term) {
      resetSearch();
      return
    };
    setBeginSearch(term);
    const result = await api.pokemonService.searchForPokemon(term);
    setSearchResults(result)
  };

  const debouncedValue = useDebounce(value, 800);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleSearch(value);
  }

  useEffect(() => {
    if (debouncedValue) {
      handleSearch(debouncedValue);
    }
  }, [debouncedValue]);



  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  return (
    <form className="search flex mx-1 mt-4" onSubmit={handleSubmit}>
      <input placeholder="Search by name" className="w-full px-2 py-0 outline-none ring-1 ring-black" onChange={handleChange} value={value} />
      <button type="submit" className="bg-black text-white px-2 py-2">{isSearching? 'searching' :'Submit'}</button>
    </form>
  );
}
