import "./App.css";
import { CreateInternshipPage } from "./pages/create-internship/create-internship";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginRegisterPage } from "./pages/login-register/login-register";
import { StudentHomepage } from "./pages/student/student-homepage";
import { RecruiterHomepage } from "./pages/recruiter/recruiter-homepage";
import { ProtectedRoute } from "./utils/protected-route";
import { LoggedIn } from "./utils/logged-in";
import InternshipList from "./components/companies/InternshipList";
import StudentBrowseInternshipsPage from "./pages/student/StudentBrowseInternshipsPage";

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
              path="/student/browse-internships"
              element={
                  <ProtectedRoute>
                      <StudentBrowseInternshipsPage />
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
          path="/create-internship"
          element={
            <ProtectedRoute>
              <CreateInternshipPage />
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
