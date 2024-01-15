import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginRegisterPage } from "./pages/login-register/login-register";
import { StudentHomepage } from "./pages/student/student-homepage";
import { RecruiterHomepage } from "./pages/recruiter/recruiter-homepage";
import { ProtectedRoute } from "./utils/protected-route";
import { LoggedIn } from "./utils/logged-in";
import InternshipList from "./companies/InternshipList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/authenticate" replace />} />
        <Route
          path="/authenticate"
          element={
            <LoggedIn>
              <LoginRegisterPage />
            </LoggedIn>
          }
        />
        <Route
          path="/student/home"
          element={
            <ProtectedRoute>
              <StudentHomepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/home"
          element={
            <ProtectedRoute>
              <RecruiterHomepage />
            </ProtectedRoute>
          }
        />
          <Route
              path="/recruiter/internships"
              element={
                  <ProtectedRoute>
                      <InternshipList />
                  </ProtectedRoute>
              }
          />
      </Routes>
    </>
  );
}

export default App;
