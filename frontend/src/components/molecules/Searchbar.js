import React, { useState,useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from "react-redux";
import { listBooks } from "../store/actions/bookActions";

function SearchBar() {

  const dispatch=useDispatch()
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query,setQuery]=useState("")
  const [timeoutId, setTimeoutId] = useState(null);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };


  const handleInputChange = (e) => {
    clearTimeout(timeoutId); 
    const newQuery = e.target.value;
    setQuery(newQuery);
    const newTimeoutId = setTimeout(() => {
     dispatch(listBooks(query))
    }, 1000);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div>
      <button
        type="button"
        onClick={toggleSearch}
        aria-expanded={isSearchOpen}
        className={`md:hidden ${
          isSearchOpen ? "hidden" : ""
        } text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1 ${
          isSearchOpen ? "bg-blue-500" : ""
        }`}
      >
   
        <span className="sr-only">Search</span>
        <h1><SearchIcon/></h1>

      </button>
      <div className={`relative ${isSearchOpen ? "" : "hidden"} md:block`}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

          <span className="sr-only">Search icon</span>
          <h1><SearchIcon/></h1>


        </div>
        <input
        value={query}
        onChange={handleInputChange}
          type="text"
          id="search-navbar"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}

export default SearchBar;
