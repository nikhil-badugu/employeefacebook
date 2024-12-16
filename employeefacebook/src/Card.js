import React from "react";

const Card = ({ empNo, name, experience, photo }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        width: "250px",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src={photo}
        alt="Employee"
        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
      />
      <h3>Emp No: {empNo}</h3>
      <p>Name: {name}</p>
      <p>Experience: {experience} Years</p>
    </div>
  );
};

export default Card;
