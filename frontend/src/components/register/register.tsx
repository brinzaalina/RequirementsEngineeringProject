import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import { RegisterRequest } from "../../models/register-request";
import { registerUser } from "../../services/auth/auth-service";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export const RegisterComponent = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string>("student");
  const [password, setPassword] = useState<string>("");
  const [passwordMatchError, setPasswordMatchError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const institutionName: string =
      userType === "student"
        ? e.currentTarget.university.value
        : e.currentTarget.companyName.value;
    const registerRequest: RegisterRequest = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      institutionName: institutionName,
      name:
        e.currentTarget.firstName.value + " " + e.currentTarget.lastName.value,
    };
    if (
      passwordMatchError ||
      registerRequest.password !== e.currentTarget.confirmPassword.value
    ) {
      console.log("Passwords do not match");
      return;
    }

    registerUser(registerRequest, userType)
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value !== password) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
    if (e.target.value === "") {
      setPasswordMatchError(false);
    }
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(e.target.value);
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
            Register
          </Typography>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <RadioGroup
              row
              aria-label="userType"
              name="userType"
              value={userType}
              onChange={handleUserTypeChange}
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="recruiter"
                control={<Radio />}
                label="Recruiter"
              />
            </RadioGroup>
          </Container>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="confirm-password"
                  error={passwordMatchError}
                  onChange={handleConfirmPasswordChange}
                  helperText={
                    passwordMatchError ? "Passwords do not match" : ""
                  }
                />
              </Grid>
              {userType === "recruiter" && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="companyName"
                    label="Company Name"
                    id="companyName"
                  />
                </Grid>
              )}
              {userType === "student" && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="university"
                    label="University"
                    id="university"
                  />
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
