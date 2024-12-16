import React, { useState, useEffect } from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

const CardDisplay = ({ data }) => {
    const [filteredData, setFilteredData] = useState(data);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    // Filter data based on search term
    useEffect(() => {
        const filtered = data.filter(
            (item) =>
                item.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item["Experience in Years"]
                    ?.toString()
                    .includes(searchTerm.toLowerCase()) ||
                item["Emp No"]?.toString().includes(searchTerm)
        );
        // console.log(filtered);
        setFilteredData(filtered);
        // setCurrentPage(1); // Reset to first page on search
        const maxPage = Math.ceil(filtered.length / recordsPerPage);
        if (currentPage > maxPage) {
            setCurrentPage(1); // Reset to page 1 if the current page exceeds max pages
        }
    }, [searchTerm, data, currentPage, recordsPerPage]);

    // Pagination Logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    const handlePageChange = (page) => {
        console.log("Changing to page:", page);
        setCurrentPage(page);
    };
    return (
        <div align="center">
            {/* Search Bar */}
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

            {/* Cards */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", maxWidth: "1500px" }}>
                {currentRecords.map((item, index) => (
                    <Card
                        key={index}
                        empNo={item["Emp No"]}
                        name={item["Name"]}
                        experience={item["Experience in Years"]}
                        photo={item.Photo}
                    />
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default CardDisplay;
