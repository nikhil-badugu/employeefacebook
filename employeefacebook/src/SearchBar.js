import React from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by Name, Experience, or Emp No"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      style={{
        marginBottom: "20px",
        padding: "10px",
        width: "300px",
        borderRadius: "5px",
        border: "1px solid #ddd",
      }}
    />
  );
};

export default SearchBar;
