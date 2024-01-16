import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/student/Filter";
import SearchBar from "../../components/student/SearchBar";
import StudentInternshipList from "../../components/student/StudentInternshipList";
import InternshipCompanyDto from "../../models/InternshipCompanyDto";

const StudentBrowseInternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<InternshipCompanyDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterValues, setFilterValues] = useState({
    locations: [],
    fields: [],
    salaryFilter: undefined as boolean | undefined,
  });
  const navigate = useNavigate();

  // Load data on startup and when page changes
  useEffect(() => {
    fetchData("");
  }, [currentPage]);

  const fetchData = (searchTerm: string) => {
    axios
      .get(`http://localhost:8080/api/internships`, {
        params: {
          locations: filterValues.locations.join(","),
          fields: filterValues.fields.join(","),
          salaryFilter: filterValues.salaryFilter,
          titleSearch: searchTerm,
          page: currentPage - 1,
          size: 3, // Adjust the size as per your requirement
        },
      })
      .then((response) => {
        setInternships(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error("Error fetching internships", error));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term); // Update the search term state
    setCurrentPage(1); // Reset to first page on new search
    fetchData(term); // Fetch data with the new search term
  };

  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/student/home")}
      >
        Back to Home
      </Button>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} md={3}>
          <Filter onFilterChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={8} sx={{ paddingRight: 4 }}>
          <SearchBar onSearch={handleSearch} />
          <StudentInternshipList
            internships={internships}
            totalPageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default StudentBrowseInternshipsPage;
