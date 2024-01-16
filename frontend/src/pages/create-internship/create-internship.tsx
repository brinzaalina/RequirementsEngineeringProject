import {
  Box,
  Button,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateInternship } from "../../models/create-internship-request";
import { createInternship } from "../../services/internship/internship-service";

const defaultTheme = createTheme();

export const CreateInternshipPage = () => {
  const [internship, setInternship] = useState<CreateInternship>({
    title: "",
    description: "",
    location: "",
    field: "",
    salary: 0,
    positions: 0,
    userId: localStorage.getItem("userId") || "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
  }, [token]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setInternship((prevInternship) => ({
      ...prevInternship,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createInternship(internship)
      .then((response) => {
        console.log(response);
        navigate("/recruiter/internships");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create Internship
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/recruiter/internships")}
          >
            Back
          </Button>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 3,
            }}
          >
            <TextField
              margin="normal"
              name="title"
              label="Title"
              value={internship.title}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              name="description"
              label="Description"
              value={internship.description}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              name="location"
              label="Location"
              value={internship.location}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              name="field"
              label="Field"
              value={internship.field}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              name="salary"
              label="Salary"
              type="number"
              value={internship.salary}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              name="positions"
              label="Number of Positions"
              type="number"
              value={internship.positions}
              onChange={handleChange}
              required
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              Create Internship
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
