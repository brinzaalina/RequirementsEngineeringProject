import React, { useState, useEffect } from "react";
import { Pagination, Box, Button, Typography } from "@mui/material";
import axios from "axios";
import InternshipCard from "./InternshipCard";
import { useNavigate } from "react-router-dom";
import InternshipCompanyDto from "../../models/InternshipCompanyDto";

const InternshipList: React.FC = () => {
  const [internships, setInternships] = useState<InternshipCompanyDto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://localhost:8080/api/companies/user/${userId}`)
        .then((response) => {
          // Extract the companyId from the response
          const { companyId } = response.data;
          // Now that you have the companyId, fetch the internships
          return axios.get(
            `http://localhost:8080/api/companies/internships/all/${companyId}?page=${
              page - 1
            }&size=2`
          );
        })
        .then((response) => {
          // Set the internships and total pages state
          setInternships(response.data.content);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => console.error("Error fetching internships", error));
    }
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h6" component="h2">
        Internships
      </Typography>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        sx={{ marginBottom: 2 }}
      />
      {internships.map((internship) => (
        <Box
          key={internship.internshipId}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: 2,
          }}
        >
          <InternshipCard internship={internship} />
        </Box>
      ))}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        sx={{ marginTop: 2 }}
      />
      <Button
        variant="contained"
        onClick={() => navigate("/create-internship")}
        sx={{
          marginTop: 2,
        }}
      >
        Create Internship
      </Button>
    </Box>
  );
};

export default InternshipList;
