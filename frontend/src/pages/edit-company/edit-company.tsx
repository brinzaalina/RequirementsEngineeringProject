import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyDto from "../../models/CompanyDto";
import { editCompany } from "../../services/company/company-service";

export const EditCompanyPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [company, setCompany] = useState<CompanyDto>({
    companyId: "",
    companyName: "",
    companyDetails: "",
  });

  useEffect(() => {
    if (token) {
      const role = localStorage.getItem("role")?.toLowerCase();
      if (role !== "recruiter") {
        if (role === "student") {
          navigate("/student/home");
        } else {
          navigate("/authenticate");
        }
      }
    } else {
      navigate("/authenticate");
    }
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://localhost:8080/api/companies/user/${userId}`)
        .then((response) => {
          setCompany(response.data);
        })
        .catch((error) => console.error("Error fetching company", error));
    }
  }, [token]);

  const handleCompanyNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompany((prevCompany) => ({
      ...prevCompany,
      companyName: event.target.value,
    }));
  };

  const handleCompanyDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompany((prevCompany) => ({
      ...prevCompany,
      companyDetails: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editCompany(company)
      .then((response) => {
        console.log(response);
        navigate("/recruiter/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Your Company
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/recruiter/home")}
        sx={{
          marginTop: 2,
          borderRadius: 5,
        }}
      >
        Back to Homepage
      </Button>
      <Box
        component="form"
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Company Name"
          value={company.companyName}
          onChange={handleCompanyNameChange}
          sx={{
            marginTop: 2,
          }}
        />
        <TextField
          label="Company Details"
          value={company.companyDetails}
          onChange={handleCompanyDetailsChange}
          sx={{
            marginTop: 2,
          }}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 2, borderRadius: 5 }}
          type="submit"
        >
          Save
        </Button>
      </Box>
    </Container>
  );
};
