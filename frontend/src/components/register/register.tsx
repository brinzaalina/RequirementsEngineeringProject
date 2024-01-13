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

const defaultTheme = createTheme();

export const RegisterComponent = () => {
  const [userType, setUserType] = useState<string>("student");
  const [password, setPassword] = useState<string>("");
  const [passwordMatchError, setPasswordMatchError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      userType: userType,
      companyName: data.get("companyName"),
      university: data.get("university"),
      confirmPassword: data.get("confirmPassword"),
    });
    if (
      passwordMatchError ||
      data.get("password") !== data.get("confirmPassword")
    ) {
      console.log("Passwords do not match");
      return;
    }
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
