import { Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InternshipList from "../../companies/InternshipList";
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

  return (
    <div>
      <Typography variant="h4" component="h1">
        Recruiter Homepage
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
        <Button variant="contained" onClick={() => navigate("/recruiter/internships")}>
            View Internships
        </Button>
      </Container>
    </div>
  );
};
