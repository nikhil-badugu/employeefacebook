import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import CardDisplay from "./CardDisplay";

const ExcelReader = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleFileRead = async () => {
      try {
        const fileUrl = `${process.env.PUBLIC_URL}/data.xlsx`;
        const response = await fetch(fileUrl);
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        // console.log(worksheet,"WS")
        let jsonData = parseWorksheet(worksheet);
        delete jsonData[0];
        jsonData.forEach((obj) => {
          Object.keys(obj).forEach((key) => {
            if (key === "undefined" || obj[key] === undefined) {
              delete obj[key];
            }
          });
        });
        jsonData = jsonData.map((item) => ({
          ...item,
          Photo: "https://via.placeholder.com/150", // Default placeholder photo
        }));
        setData(jsonData);
      }
      catch(error) {
        console.error("Error loading Excel file:", error);
      }
    };
      
    handleFileRead();
  },[data])
  

  // Function to parse the worksheet
  const parseWorksheet = (worksheet) => {
    const data = [];
    const columnMap = {
      A: "Emp No",
      B: "Name",
      C: "Experience in Years",
    };

    const rows = {};

    // Loop through worksheet cells
    Object.keys(worksheet).forEach((cellKey) => {
      if (cellKey[0] === "!") return; // Skip meta keys

      const col = cellKey.replace(/\d+/g, ""); // Extract column letter
      const row = cellKey.replace(/[A-Z]/g, ""); // Extract row number

      if (!rows[row]) rows[row] = {};
      rows[row][columnMap[col]] = worksheet[cellKey].v;
    });

    // Convert row objects to array
    Object.values(rows).forEach((row) => {
      if (row["Emp No"] && row["Name"] && row["Experience in Years"]) {
        data.push(row);
      }
    });

    return data;
  };

  return (
    <div>
      {/* <button onClick={handleFileRead}>Load Excel Data</button> */}
      {data.length > 0 ? (
        <CardDisplay data={data} />
      ) : (
        <p>No data loaded. Click the button to load.</p>
      )}
    </div>
  );
};

export default ExcelReader;
