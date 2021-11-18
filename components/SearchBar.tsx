import React, {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useDebounce } from "../services/hooks";
import searchContext, { useSearch } from "../context/searchContext";
import api from "../services/initApi";

export default function SearchBar() {
  const [value, setValue] = useState("");

  const { setIsSearching, setSearchResults ,resetSearch, setBeginSearch } = useSearch();

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
    <form className="flex mx-1 mt-4" onSubmit={handleSubmit}>
      <input placeholder="Search by name" className=" px-2 py-2  searchbox outline-none ring-2 ring-black" onChange={handleChange} value={value} />
      <button type="submit" className="bg-black text-white px-2 py-2">Submit</button>
    </form>
  );
}
