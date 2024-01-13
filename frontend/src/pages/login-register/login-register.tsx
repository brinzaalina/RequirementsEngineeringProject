import { Button, Container } from "@mui/material";
import { LoginComponent } from "../../components/login/login";
import { RegisterComponent } from "../../components/register/register";
import { useState } from "react";

export const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Container 
        component="main" 
        maxWidth="xs"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
      {isLogin ? <LoginComponent /> : <RegisterComponent />}
      <Button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register now" : "Already have an account? Log in"}
      </Button>
    </Container>
  );
};
