import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit} className="my-auto">
        <input
          className="border rounded-sm border-zinc-500 px-3 py-1 mr-2"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
        <button
          className="bg-orange-500 text-white px-3 py-1 rounded-md "
          type="submit"
        >
          Search
        </button>
      </form> */}
    </>
  );
}

export default Search;