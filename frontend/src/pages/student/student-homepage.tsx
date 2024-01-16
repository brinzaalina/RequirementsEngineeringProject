import { Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const StudentHomepage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const role = localStorage.getItem("role")?.toLowerCase();
      if (role !== "student") {
        if (role === "recruiter") {
          navigate("/recruiter/home");
        } else {
          navigate("/authenticate");
        }
      }
    } else {
      navigate("/authenticate");
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/authenticate");
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Welcome to your Student Homepage! Explore exciting internship
        opportunities and take the next step in your career journey. Feel free
        to browse available internships and make the most of your experience. 
        Happy exploring!
      </Typography>
      <Container
        maxWidth="md"
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/student/browse-internships")}
          sx={{
            marginTop: 2,
            borderRadius: 5,
          }}
        >
          Browse Internships
        </Button>
        <Button
          variant="contained"
          onClick={() => handleLogout()}
          sx={{
            marginTop: 2,
            borderRadius: 5,
          }}
        >
          Logout
        </Button>
      </Container>
    </Container>
  );
};
