import { Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const RecruiterHomepage = () => {
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/authenticate");
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, Recruiter!
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        Explore the tools below to manage your company profile and view your
        internships.
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
          onClick={() => navigate("/recruiter/edit-company")}
          sx={{
            marginTop: 2,
            borderRadius: 5,
          }}
        >
          Edit company profile
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/recruiter/internships")}
          sx={{
            marginTop: 2,
            borderRadius: 5,
          }}
        >
          View Your Internships
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
