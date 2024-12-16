import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          style={{
            margin: "5px",
            padding: "10px",
            backgroundColor: currentPage === index + 1 ? "#007BFF" : "#f1f1f1",
            color: currentPage === index + 1 ? "white" : "black",
            border: "1px solid #ddd",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
