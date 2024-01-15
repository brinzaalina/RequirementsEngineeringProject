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
    <div>
      <Typography variant="h4" component="h1">
        Student Homepage
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
          onClick={() => handleLogout()}
          sx={{
            marginTop: 1,
          }}
        >
          Logout
        </Button>
      </Container>
    </div>
  );
};
