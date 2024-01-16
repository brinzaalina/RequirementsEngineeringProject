import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthenticationRequest } from "../../models/auth-request";
import { loginUser } from "../../services/auth/auth-service";

const defaultTheme = createTheme();

export const LoginComponent = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authRequest: AuthenticationRequest = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    loginUser(authRequest)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("email", response.email);
        localStorage.setItem("availability", response.availability.toString());
        const role = response.role.toLowerCase();
        navigate("/" + role + "/home");
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
